import axios from "axios";
import ipfsSaveFile from "./ipfsStore";

const validate = (userAddress) => {
  const apiEndPointCid = `hash/${userAddress}/`;

  const cidFromClient = localStorage.getItem("cid");

  if (cidFromClient) {
    const cidFromServer = axios.get(apiEndPointCid);

    if (cidFromClient === cidFromServer) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export default validate;
