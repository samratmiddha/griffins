import axios from "axios";
import BackendClient from "../BackendClient";
import ipfsSaveFile from "./ipfsStore";

const validate = async (userAddress) => {
  const apiEndPointCid = `hash/${userAddress}/`;

  const cidFromClient = localStorage.getItem("cid");

  if (cidFromClient) {
    const cidFromServer = await BackendClient.get(apiEndPointCid);
    console.log(String(cidFromClient["cid"]));
    if (cidFromClient === cidFromServer.data.hash) {
      return true;
    } else {
      console.log(cidFromClient, " sdasad ", cidFromServer);
      return false;
    }
  } else {
    return true;
  }
};

export default validate;
