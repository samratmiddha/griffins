import BackendClient from "../BackendClient";
import ipfsSaveFile from "./ipfsStore";

const checkBuffer = (symbol, quantity, transactionId, userAddress) => {
  const apiEndPointGet = `buffer/${symbol}/`;
  const apiEndPointPost = `buffer/`;

  const availableQuantity = BackendClient.get(apiEndPointGet).then((res) => {
    if (res.data.detail) {
      BackendClient.post(apiEndPointPost, { symbol: symbol, quantity: 0 });
      return 0;
    } else {
      return res.data.quantity;
    }
  });

  if (availableQuantity >= quantity) {
    let updatedBuffer = availableQuantity - quantity;
    BackendClient.patch(apiEndPointGet, { quantity: updatedBuffer });

    let newTransaction = {
      symbol,
      quantity,
      transactionId,
    };

    ipfsSaveFile(newTransaction);
  } else {
    // buy some more
    let updatedBuffer = Math.ceil(quantity);
    BackendClient.patch(apiEndPointGet, { quantity: updatedBuffer });

    let newTransaction = {
      symbol,
      quantity,
      transactionId,
    };

    ipfsSaveFile(newTransaction, userAddress);
  }
};

export default checkBuffer;
