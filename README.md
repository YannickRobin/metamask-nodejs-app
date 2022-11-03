# metamask-nodejs-app

The objective of this application is to execute 

## Setup guide

```
npm install
node .
```

## API

### Health check
This service checks if the server is responding. The response should be **OK**.

```
curl 'http://localhost:3000/healthcheck'
```

### Verify message

Valid signature returns **true**:

```
curl 'http://localhost:3000/message/verify?message=To%20authenticate%20my%20account,%20I%20am%20signing%20with%20the%20nonce%20799171&address=0x9659e7c8A506ADD971F1d3C96C6e07cA5500E423&signature=0x5c69705def16f3652ca76f97091b6ae8ef947df1b8246d00a432fce434a0497b15f412fbe54e8367a87e383af22de47a22a7010fc0e89d1d9da893fe6e7fcdf11b'
```

Invalid signature returns **false**:

```
curl 'http://localhost:3000/message/verify?message=To%20authenticate%20my%20account,%20I%20am%20signing%20with%20the%20nonce%20799171&address=0x9659e7c8A506ADD971F1d3C96C6e07cA5500E423&signature=0x5c69705def16f3652ca76f97091b6ae8ef947df1b8246d00a432fce434a0497b15f412fbe54e8367a87e383af22de47a22a7010fc0e89d1d9da893fe6e7fcdf11bXXXX'
```

### Get transaction receipt
This service gets the details of the transaction. If there is no transaction, it means the transaction is invalid or not yet completed.
```
curl 'http://localhost:3000/transaction/receipt?txhash=0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08'
```
To compare with etherscan result, you can go to https://goerli.etherscan.io/tx/0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08.
