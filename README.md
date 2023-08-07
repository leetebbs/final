# Rafflit NFT Raffle Dapp

Rafflit was built as my Alchemy Ethereum Bootcamp Final project submission.

## How it Works:

1. Approval of NFT Transfer: Users who want to raffle off their NFT will need to approve the transfer of the NFT to the smart contract.

2. Listing the Raffle: After the NFT is approved for transfer, the user will need to pay a gas fee to list the raffle on the smart contract.

3. Buying Tickets: Once the raffle is listed on the smart contract, other users can buy tickets for a chance to win the NFT. The user can set the number of tickets available for purchase and the price of each ticket.

4. Choosing the Winner: Once all the tickets are sold, the smart contract will call Chainlink VRF (Verifiable Random Function) to get a random number. This random number will be used to select the winner of the raffle.

5. Transferring the NFT: The smart contract will transfer the NFT to the winner of the raffle.

6. Transferring the Funds: Users who raffle their NFTS will recieve all funds minus platform fees directly from the smart contract as soon as the raffle is complete.

### Todo

Add User Dashboard to show current raffles and completed raffles data.

Design a nice UI and implement.

Complete the footer

add to multiple networks

add tx hash to winners cards with link to block explorer.


### How its made

Using React as a framework and Tailwind for the styling. 

I used the following libaries 

alchemy-sdk

axios

cors

dotenv

ethers

express

flowbite

framer-motion

slick-carousel

wagmi

rainbowkit

Tailwind

### Express server used for middleware

https://github.com/leetebbs/final-express

running @ https://final-express.vercel.app/

## Endpoints for the server are:

https://final-express.vercel.app/data

https://final-express.vercel.app/counter

https://final-express.vercel.app/winners


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# Screenshots

## Landing page

![Project landingpage](https://github.com/leetebbs/final/blob/main/rafflit-landing.png)

### Create a raffle

![Create](https://github.com/leetebbs/final/blob/main/rafflit-create-araffle.png)
