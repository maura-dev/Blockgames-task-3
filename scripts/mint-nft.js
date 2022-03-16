require("dotenv").config();

const API_URL = process.env.ALCHEMY_API_KEY_URL;
const PUBLIC_KEY =process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

const contractAddress = "0x224C36554e4EFe7959549cAEaF8FE51EB8Ba1628";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
    //gets latest nonce

    const tx= {
        'from':PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas':500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI()
    }
    //the transaction details

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
};

mintNFT("https://gateway.pinata.cloud/ipfs/QmPScVwQ6ehDd1o4XPTCwKcyBrraHqKdE9qYr4dsjaSaEk");
