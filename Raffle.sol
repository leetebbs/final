// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Raffled is ReentrancyGuard, VRFConsumerBaseV2, ConfirmedOwner {

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);
    event Winner(uint256 raffleId,address winner);
    event RaffleCreated(
        address indexed _from,
        uint256 indexed _id,
        uint256 _tickets
    );

    struct Raffle {
        uint256 raffleId;
        uint256 numberOfTickets;
        uint256 priceOfTickets;
        uint256 tokenId;
        uint256 raffleLength;
        uint256 _initialNumberOfTickets;
        address nftAddress;
        address owner;
        bool raffleActive;

    }

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }

    mapping(uint256 => mapping(uint256 => address)) public raffleTicketHolders;
    mapping(uint256 => address) public winners;
    mapping(uint256 => RequestStatus) public s_requests; /* requestId --> requestStatus */
    
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint16 requestConfirmations = 3;
    uint32 callbackGasLimit = 500000;
    uint32 numWords = 1;
    uint64 s_subscriptionId;
    uint256 public counter = 0; 
    uint256 public fee = 10;
    uint256 public lastRequestId;
    uint256 public result;
    uint256 public endedRaffleId;
    address public winner;
    address public contractOwner;
    uint256[] public requestIds;

    bytes32 keyHash =
        0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

    Raffle[] public raffle;

    constructor(uint64 subscriptionId)
        VRFConsumerBaseV2(0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
        );
        s_subscriptionId = subscriptionId;
        contractOwner = msg.sender;
    }

    function requestRandomWords() internal returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        randomResult(_randomWords[0]);
        pickWinner(endedRaffleId);
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(uint256 _requestId)
        external
        view
        returns (bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    function randomResult(uint256 randomWords) internal {
        Raffle storage _raffle = raffle[endedRaffleId];
        uint256 mod = _raffle._initialNumberOfTickets;
        result = (randomWords % mod) + 1;
        return;
        // call the winner here ?
    }

    //set owner fee
    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    //approve first in ui for this contract to interact with the nft approve in the nft for this contract
    function createRaffle(
        uint256 _numberOfTickets,
        uint256 _priceOfTickets,
        address _nftAddress,
        uint256 _tokenId,
        uint256 _raffleLength
    ) external {
        //transfer nft to this address
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);
        raffle.push(
            Raffle(
                counter,
                _numberOfTickets,
                _priceOfTickets,
                _tokenId,
                _raffleLength,
                _numberOfTickets,
                _nftAddress,
                msg.sender,
                true

            )
        );
        emit RaffleCreated(msg.sender, counter, _numberOfTickets);
        counter = counter + 1;
    }

    // sell tickets for a raffle and store players

    function buyTicket(uint256 _raffleId, uint256 _numberOfTickets)
        public
        payable
    {
        Raffle storage _raffle = raffle[_raffleId];
        require(_raffle.raffleActive == true, "Raffle is not active");
        require(
            _raffle.numberOfTickets - _numberOfTickets >= 0,
            "Not enought tickets available"
        );
        uint256 cost = _raffle.priceOfTickets;
        uint256 totalCost = cost * _numberOfTickets;
        require(msg.value >= totalCost, "Incorrect amount sent");
        //store the ticket purchasers in a mappig for the raffle.
        for (uint256 i = 0; i < _numberOfTickets; i++) {
            raffleTicketHolders[_raffleId][_raffle.numberOfTickets] = msg
                .sender;
            _raffle.numberOfTickets = _raffle.numberOfTickets - 1;
            //emit an event for purchsed ticket
        }
        if (_raffle.numberOfTickets == 0) {
            _raffle.raffleActive = false;
            endedRaffleId = _raffleId;
            requestRandomWords();
        }
    }

    function pickWinner(uint256 whichRaffleId) internal returns (address) {
        Raffle storage _raffle = raffle[whichRaffleId];
        address getNftAddress = _raffle.nftAddress;
        winner = raffleTicketHolders[whichRaffleId][result];
        uint256 totalPrice = _raffle.priceOfTickets * _raffle._initialNumberOfTickets;
        uint256 fees = (totalPrice / 100) * fee;
        uint256 returnValue = totalPrice - fees;
        IERC721(getNftAddress).transferFrom(
            address(this),
            winner,
            _raffle.tokenId
        );
        winners[whichRaffleId] = winner;
        (bool success, ) = payable(_raffle.owner).call{value: returnValue}("");
        require(success, "Funds not sent");
        (bool suc, ) = payable(contractOwner).call{value: fees}("");
        require(suc, "Funds not sent");
        emit Winner(whichRaffleId, winner);
        return winner;
    }
}
