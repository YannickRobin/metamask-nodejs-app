# metamask-nodejs-app

The objective of this application is to provide basic blockchain API to deploy on BTP that can be consumed by SAP Commerce. 

## Local setup

- Clone repo
- Go to **metamask-nodejs-app**
```
npm install
API_KEY=CE9F24HB4N2G6UFF2UZC5AH8DBJP96GGUC node .
```

## Deploy to BTP

- Clone repo
- Go to **metamask-nodejs-app**
```
cd metamask-nodejs-app
```
- Login to BTP
```
cf api https://api.cf.eu20.hana.ondemand.com
cf login --sso
```
- Select your target organisation and space
```
Select an org:
1. dbs-cx-services_cx-boosters-41n7uah4

Org (enter to skip): 1
Targeted org dbs-cx-services_cx-boosters-41n7uah4.

Targeted space dev.

API endpoint:   https://api.cf.eu20.hana.ondemand.com
API version:    3.124.0
user:           yannick.robin@sap.com
org:            dbs-cx-services_cx-boosters-41n7uah4
space:          dev
```
- Verify **manifest.yml**
```
vi manifest.yml
```
- Push the application (this will create the route, deploy and start the application)
```
cf push
```
- Wait for metamask-nodejs-app to start
```
Waiting for app metamask-nodejs-app to start...

Instances starting...
Instances starting...
Instances starting...
Instances starting...

name:              metamask-nodejs-app
requested state:   started
routes:            metamask-nodejs-app-quiet-badger-ez.cfapps.eu20.hana.ondemand.com
last uploaded:     Tue 08 Nov 15:21:15 +08 2022
stack:             cflinuxfs3
buildpacks:
	name               version   detect output   buildpack name
	nodejs_buildpack   1.7.73    nodejs          nodejs

type:            web
sidecars:
instances:       1/1
memory usage:    128M
start command:   npm start
     state     since                  cpu    memory   disk     logging      details
#0   running   2022-11-08T07:21:31Z   0.0%   0 of 0   0 of 0   0/s of 0/s
```
- Go the the route indicated into the logs
```
curl 'https://metamask-nodejs-app-quiet-badger-ez.cfapps.eu20.hana.ondemand.com/getEtherPrice'
```

## API

### Get Ether Price
This service get the ether price in USD. It can be used as an health check of the service

```
curl 'http://localhost:3000/getEtherPrice'
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
### Get transaction
This service gets the details of the transaction. If there is no transaction, it means the transaction is invalid or not yet completed.
```
curl 'http://localhost:3000/transaction/0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08?provider=5'
```

Here is an example of transaction:

```
{
  hash: '0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08',
  type: 2,
  accessList: [],
  blockHash: '0x060d14720b862e98842d27d944af0763d0d7fe26f20a47513f89dabce63abf32',
  blockNumber: 7875387,
  transactionIndex: 79,
  confirmations: 7944,
  from: '0x9659e7c8A506ADD971F1d3C96C6e07cA5500E423',
  gasPrice: BigNumber { _hex: '0x01b5ebe6f8', _isBigNumber: true },
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x023487df73', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x7c74', _isBigNumber: true },
  to: '0x65be1967fe184FC045819fe3E41c08B98Ca5Ad72',
  value: BigNumber { _hex: '0x0221b262dd8000', _isBigNumber: true },
  nonce: 27,
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  r: '0x635a7002a5b4d271274d7ef572d70491c1d1c38e78b586458f1ad50c767ffc9f',
  s: '0x4b65b1948e2b17221dda676e4513099486804ca73270a229f97a39844a9ac23d',
  v: 0,
  creates: null,
  chainId: 5,
  wait: [Function]
}
```

### Get transaction receipt
This service gets the receipt of the transaction. If there is no transaction, it means the transaction is invalid or not yet completed.
```
curl 'http://localhost:3000/transaction/0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08/receipt?provider=5'
```

Here is an example of transaction receipt:

```
{
  to: '0x65be1967fe184FC045819fe3E41c08B98Ca5Ad72',
  from: '0x9659e7c8A506ADD971F1d3C96C6e07cA5500E423',
  contractAddress: null,
  transactionIndex: 79,
  gasUsed: BigNumber { _hex: '0x52f8', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x060d14720b862e98842d27d944af0763d0d7fe26f20a47513f89dabce63abf32',
  transactionHash: '0x87e3fb9d5b56c64497918706040b005049e6759bb02b42faae61ab476ef2fb08',
  logs: [],
  blockNumber: 7875387,
  confirmations: 7952,
  cumulativeGasUsed: BigNumber { _hex: '0x01909841', _isBigNumber: true },
  effectiveGasPrice: BigNumber { _hex: '0x01b5ebe6f8', _isBigNumber: true },
  status: 1,
  type: 2,
  byzantium: true
}
```
