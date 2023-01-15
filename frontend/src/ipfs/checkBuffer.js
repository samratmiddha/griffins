import BackendClient from "../BackendClient";
import ipfsSaveFile from "./ipfsStore";

const checkBuffer = (symbol, quantity, transactionId, userAddress) => {
  const apiEndPointGet = `buffer/${symbol}/`;
  const apiEndPointPost = `buffer/`;

  const availableQuantity = BackendClient.get(apiEndPointGet).then((res) => {
      return res.data["quantity"];
  }).catch(async (e) => {
    await BackendClient.post(apiEndPointPost, { stock: symbol, quantity: 1 });
  });

  if (Number(availableQuantity) >= Number(quantity)) {
    let updatedBuffer = Number(availableQuantity) - Number(quantity);
    BackendClient.patch(apiEndPointGet, { quantity: 2 });
    console.log("hell1")

    let newTransaction = {
      symbol,
      quantity,
      transactionId,
    };

    console.log(userAddress);
    ipfsSaveFile(newTransaction, userAddress);
  } else {
    // buy some more
    console.log("quanti")
    let updatedBuffer = Math.ceil(Number(quantity));
    BackendClient.patch(apiEndPointGet, { quantity: 2 });

    let newTransaction = {
      symbol,
      quantity,
      transactionId,
    };

    console.log(userAddress);
    ipfsSaveFile(newTransaction, userAddress);
  }
};

export default checkBuffer;
