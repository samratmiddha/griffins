import axios from "axios"
import ipfsSaveFile from "./ipfsStore"

const checkBuffer = (symbol, quantity, transactionId) => {
    const apiEndPointGet = ""
    const apiEndPointPost = ""
    
    const availableQuantity = axios.get(apiEndPointGet)

    if (availableQuantity >= quantity){
        let updatedBuffer = axios.post(apiEndPointPost, {});

        let newTransaction = {
            symbol,
            quantity,
            transactionId,
        }

        ipfsSaveFile(newTransaction);
    } else {
        // buy some more buffer
    }
}

export default checkBuffer