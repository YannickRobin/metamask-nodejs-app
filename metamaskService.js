const { ethers } = require('ethers');

async function sayHello() {
  try {
	const hello = "hello";
	return hello;
  } catch(error) {
    console.log(error.message, error.stack);
  }
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

module.exports = {
  sayHello,
  verifyMessage
}
