NodeJS example test Ethereum wallet service:
This service is for demonstration purposes only running to docker containers.
When service is first started - it creates wallet and persists key in local Mongo DB.
Private Key is saved in unencrypted form and not a best practice for production use.
Service is configured to run against Goerli Ethereum Testnet.
https://github.com/eluzgin/ethereum_wallet_api 

Build and run: docker compose up


1) Get hotwallet account balance:
```
GET http://localhost:3000/wallet
Response:
{
    "address": "0x66f5721011Fe49E84b4E6676C6bc079F2aA0aE96",
    "balance": "2.0"
}
```

2) Get balance for any valid address on network:

```
POST http://localhost:3000/balance
Body: {
    "address": "0x692763f79c02e48dbBf0Cfa3422207e4B91Ae93D"
}
Response:

"7.074120638081009344"

```

3) Send transfer from hotwallet to any address:
gas_limit parameter is optional. Default value 100000 is omitted.

```
POST http://localhost:3000/send
Body: {
    "address": "0x692763f79c02e48dbBf0Cfa3422207e4B91Ae93D",
    "amount": 0.1,
    "gas_limit": 100000
}
Response:
{
    "type": 2,
    "chainId": 5,
    "nonce": 0,
    "maxPriorityFeePerGas": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "maxFeePerGas": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "gasPrice": null,
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x0186a0"
    },
    "to": "0x692763f79c02e48dbBf0Cfa3422207e4B91Ae93D",
    "value": {
        "type": "BigNumber",
        "hex": "0x016345785d8a0000"
    },
    "data": "0x",
    "accessList": [],
    "hash": "0x8c661018dba693d825e43f5823bb59fcd4389b37053eac11351a5c3cb3191fd2",
    "v": 0,
    "r": "0xa392354b3c1cc95352d162957d355f861176c41a3ba6c45f886de3c17b8bd71c",
    "s": "0x1d4a7dcd2b4d354076867d9dc06a617ae075e81b20ae87c8fdf6143b13cc47a4",
    "from": "0x66f5721011Fe49E84b4E6676C6bc079F2aA0aE96",
    "confirmations": 0
}
```

4) Get transaction by transaction hash:

```
POST http://localhost:3000/transaction
Body: {
    "hash": "0x8c661018dba693d825e43f5823bb59fcd4389b37053eac11351a5c3cb3191fd2"
}
Response:
{
    "hash": "0x8c661018dba693d825e43f5823bb59fcd4389b37053eac11351a5c3cb3191fd2",
    "type": 2,
    "accessList": [],
    "blockHash": "0x11b69e9535d562b59df566b092cea05c9b2b79146d28cd255fb3745ff3b13cc6",
    "blockNumber": 6900788,
    "transactionIndex": 17,
    "confirmations": 41,
    "from": "0x66f5721011Fe49E84b4E6676C6bc079F2aA0aE96",
    "gasPrice": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "maxPriorityFeePerGas": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "maxFeePerGas": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x0186a0"
    },
    "to": "0x692763f79c02e48dbBf0Cfa3422207e4B91Ae93D",
    "value": {
        "type": "BigNumber",
        "hex": "0x016345785d8a0000"
    },
    "nonce": 0,
    "data": "0x",
    "r": "0xa392354b3c1cc95352d162957d355f861176c41a3ba6c45f886de3c17b8bd71c",
    "s": "0x1d4a7dcd2b4d354076867d9dc06a617ae075e81b20ae87c8fdf6143b13cc47a4",
    "v": 0,
    "creates": null,
    "chainId": 5
}
```

5) Get transaction receipt by transaction hash:

```
POST http://localhost:3000/transaction_receipt
Body: {
    "hash": "0x8c661018dba693d825e43f5823bb59fcd4389b37053eac11351a5c3cb3191fd2"
}
Response:
{
    "to": "0x692763f79c02e48dbBf0Cfa3422207e4B91Ae93D",
    "from": "0x66f5721011Fe49E84b4E6676C6bc079F2aA0aE96",
    "contractAddress": null,
    "transactionIndex": 17,
    "gasUsed": {
        "type": "BigNumber",
        "hex": "0x5208"
    },
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "blockHash": "0x11b69e9535d562b59df566b092cea05c9b2b79146d28cd255fb3745ff3b13cc6",
    "transactionHash": "0x8c661018dba693d825e43f5823bb59fcd4389b37053eac11351a5c3cb3191fd2",
    "logs": [],
    "blockNumber": 6900788,
    "confirmations": 57,
    "cumulativeGasUsed": {
        "type": "BigNumber",
        "hex": "0x4c7e1a"
    },
    "effectiveGasPrice": {
        "type": "BigNumber",
        "hex": "0x54708b00"
    },
    "status": 1,
    "type": 2,
    "byzantium": true
}
```

Implemented May 17, 2022 by Eugene Luzgin (eluzgin@gmail.com)
