import axios from "axios";
import { create } from "ipfs-http-client";
import BackendClient from "../BackendClient";

const ipfsClient = async () => {
  const ipfs = await create({
    host: `localhost`,
    port: 5002,
    protocol: `http`,
  });

  console.log(ipfs);
  return ipfs;
};

const ipfsSaveFile = async (transaction, userAddress) => {
  const client = await ipfsClient();
  console.log("ipfs ", userAddress);
  const apiEndPointPostCid = `hash/${String(userAddress)}/`;
  await BackendClient.get(apiEndPointPostCid).catch(async (res) => {
    await BackendClient.post("hash/", { user_id: userAddress, hash: "as" });
  });

  const cid = window.localStorage.getItem("cid");

  let data;
  let jsonData;
  if (cid){
    let fileData = client.get(cid);

    for await (const itr of fileData) {
      data = Buffer.from(itr).toString();
    }
  
    jsonData = JSON.parse(data);
  } else {
    jsonData = []
  }
  let newJsonData = [...jsonData, transaction];
  // newJsonData.push({transaction})

  let options = {
    wrapWithDirectory: false,
  };

  let newCid = await client.add(JSON.stringify(newJsonData), options);

  let updatedBufferOfServer = BackendClient
    .patch(apiEndPointPostCid, { hash: newCid })
    .then((res) => {
      return res.data;
    });
  // console.log(updatedBufferOfServer);
  // console.log(Buffer.newCid.cid);
  data = newCid.cid.toString("base16")
  console.log(data)
  window.localStorage.setItem("cid", newCid.cid);
};

export default ipfsSaveFile;
