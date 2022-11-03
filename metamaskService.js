const { ethers } = require('ethers');
const API_KEY = "CE9F24HB4N2G6UFF2UZC5AH8DBJP96GGUC";

async function getEtherPrice() {
  const provider = new ethers.providers.EtherscanProvider(1, API_KEY); //homestead mainnet

  const price = await provider.getEtherPrice();

  if (!price)
    console.log('price not found');
  else
  console.log(price);

  return price;
}

async function verifyMessage(message, address, signature) {
  console.log("message: " + message); //To authenticate my account, I am signing with the nonce 799171
  console.log("address: " + address); //0x9659e7c8A506ADD971F1d3C96C6e07cA5500E423
  console.log("signature: " + signature); //0x5c69705def16f3652ca76f97091b6ae8ef947df1b8246d00a432fce434a0497b15f412fbe54e8367a87e383af22de47a22a7010fc0e89d1d9da893fe6e7fcdf11b

  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getTransaction(txhash, providerCode) {
  console.log("Get transaction " + txhash);
  const provider = new ethers.providers.EtherscanProvider(providerCode, API_KEY);

  const tx = await provider.getTransaction(txhash);

  if (!tx)
    console.log('tx not found');
  else
  console.log(tx);

  return tx;
}

async function getTransactionReceipt(txhash, providerCode) {
  console.log("Get transaction receipt" + txhash);
  const provider = new ethers.providers.EtherscanProvider(providerCode, API_KEY);

  const tx = await provider.getTransactionReceipt(txhash);

  if (!tx)
    console.log('tx not found');
  else
  console.log(tx);

  return tx;
}

module.exports = {
  getEtherPrice,
  verifyMessage,
  getTransaction,
  getTransactionReceipt
}