# Webster : The modern solution for buying stocks with blockchain

## Deploying Our Project on your local :

```
$ ~/griffin/ : cd frontend
$ ~/griffin/frontend/ : npm install
$ ~/griffin/frontend/ : npm start
$ ~/griffin/backend/contract/ : {Compile the solidity oracleContract.sol and deploy it on the goerli testnet and change the contract in grinffin/frontend/src/components/toke/tokenTransaction/}
$ ~/griffin/griffins/ : python3 manage.py runserver
$ ~/ : npm i --location=global ipfs
$ ~/ : jsipfs daemon
{Open a new terminal}
$ ~/ : jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5002", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'
$ ~/ : jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'


```

# Frontend :

The technologies used in this process were : 

```
React , Redux , Debouncer , Toaster , Alpha-Vantage Api , Crypto-Compare Api , Chartjs
```
We have creted a modular backend for our users .

The design goes like this : 

Here we are explaining the userflow of our frontend :

## Landing Page :


1 ) The Landing page has search which fetches data from the alpha-vantage api but the problem was that this api provided very small amount of requests so we used **debounce** to solve .

2 ) There is a one-click verification process .

3 ) As the user searches and selects a particular stock he is redirected to the buy and sell page

![Screenshot_20230115_072755](https://user-images.githubusercontent.com/65587505/212513735-44e0d06d-eebc-4f77-9d07-8963501fec75.png)


## Buy and Sell Page

1 ) On this page we are rendering a chart about the stocks history . 

2 ) User can enter the units the stock he wants and the amount of **ETH** he wants to spend on the stock then on clicking continue the user will have to sign the transaction and send it to the contract .

![Screenshot_20230115_072950](https://user-images.githubusercontent.com/65587505/212514194-d9ca6517-b440-4233-813f-a44ea3f1a400.png)


# Smart Contract : 

1 ) We tested our smart contract on the goerli testnet so in some parts of the code we have hard-coded the contract address .

2 ) Our contract is inhereting the Chainlink contracts used for communication with the oracle node which we are using as we are verifying if the value of ether sent by the user is equal to the value of the units of stock the user is asking for 

3 ) Also our smart contract will be storing **ETH** relative to each user in the contract .

### OR

```
Our contract is using a ChainLink service for verifying the transaction such that for a transaction :

msg.value-msg.gas = value of the units of stock asked by the user 
```

![WhatsApp Image 2023-01-15 at 07 36 36](https://user-images.githubusercontent.com/65587505/212519584-5fc94db5-6b03-4c50-862c-f4159840fa2d.jpeg)


# IPFS :

**IPFS** is decentralized stroage solution . 

In this step we used the following technologies : 

```
jsipfs (for running a local ipfs node) , ipfs-http-client 
```
A major problem solved in this step was the security problem as here we needed to store the hash for the file associated with which contained his transaction . If only one of user or us were storing the hash for the file , whichever party , will have an unfair say over the file also this party can manipulate the files . 

## Proposed Solution :

We made a **django** backend whenever the transaction is successful a signal is emmited by which it sends the **transaction id** , **stock** , **units of stock** are emitted this is handled by this backend which updates the ipfs file realtive to the user and updates the ipfs relative to the user and thus generates a new hash for the user's data file on the ipfs . This hash is then stored both on our django backend and whatever method user prefer's to store the data now if user tries to change his file without a transaction the hash we have and he has differ but our will veto . 

Though there is some scope of a single point of trust still we can give an arguement that all this is automated and sufficient secutity level of security can be ensured in a deployed project .

Also this model is proposed for the current time where it is not possible to mint ERC20 tokens for any stockPrice

![WhatsApp Image 2023-01-15 at 07 44 12](https://user-images.githubusercontent.com/65587505/212519626-3fda8f7d-33ce-48a2-b693-fac5c0339aa1.jpeg)


# Features :

1 ) Buying smaller than one share by user :

    This seems to be a very obvious solution 

2 ) Security : 

    Transactions are done using blockchain and thus come with inherent security .

3 ) Gas Price :

    Gas Price is a major issue in blockchain but over long term usage Gas Price is expected to be less compared to the overall turnover of the stock .


# Possible Improvements :

## ERC20 Token :

Ideally stock every company shall have it's ERC20 token but this was not this case so if we were the share distributor we could have implemented a ERC20 token format for our platform user could have bought the erc token to be part of the transactions but then this model would be a solution more close to being a mutual fund than an independent stock purchasing platform . 

## Orbital DB : 

We could have used this DBMS for ipfs but due to lack of time we were not able to cover it's stack .


# Possible Implications : 

Since , We were not able to deploy the ERC20 token solution we can only act as the first and not the second given that we are able to execute the ERC20 token 

## A BlockChain MutualFund :

In our code we will be able to assign user stock 

## A BlockChain solution for StockMarket :

If we deployed the ERC20 token every company will release it's token on the blockchain which will be blockchain equivalent to the share and we can make user buy those tokens and store it in their metamask .
