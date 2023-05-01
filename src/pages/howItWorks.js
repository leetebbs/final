import React from 'react'

const HowItWorks = () => {
  return (
    <div>
        <div className="mt-20">
        <h1 className='text-[30px] font-semibold'>How it Works:</h1>
        <div className="w-[60%] mx-auto mt-20 flex flex-col gap-5">

       <p> 1. Approval of NFT Transfer: Users who want to raffle off their NFT will need to approve the transfer of the NFT to the smart contract.</p>

<p>2. Listing the Raffle: After the NFT is approved for transfer, the user will need to pay a gas fee to list the raffle on the smart contract.</p>

<p>3. Buying Tickets: Once the raffle is listed on the smart contract, other users can buy tickets for a chance to win the NFT. The user can set the number of tickets available for purchase and the price of each ticket.</p>

<p>4. Choosing the Winner: Once all the tickets are sold, the smart contract will call Chainlink VRF (Verifiable Random Function) to get a random number. This random number will be used to select the winner of the raffle.</p>

<p>5. Transferring the NFT: The smart contract will transfer the NFT to the winner of the raffle.</p>
<p>6. Transferring the Funds: Users who raffle their NFTS will recieve all funds minus platform fees directly from the smart contract as soon as the raffle is complete.</p>

{/* <p>Overall, the process of a user raffling off an NFT through a smart contract involves approval of NFT transfer, listing the raffle, buying tickets, choosing a winner through Chainlink VRF, and transferring the NFT to the winner. The smart contract facilitates this entire process and ensures that it is transparent and fair.
</p> */}

  </div>

        </div>
    </div>
  )
}

export default HowItWorks