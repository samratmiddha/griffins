import axios from "axios";
import ipfsSaveFile from "./ipfsStore"

const validate = () => {
    const apiEndPointCid = ""

    const cidFromClient = localStorage.getItem("cid")

    if (cidFromClient){
        const cidFromServer = axios.post(apiEndPointCid, {})

        if (cidFromClient === cidFromServer) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

export default validate