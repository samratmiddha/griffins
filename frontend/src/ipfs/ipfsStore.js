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
  const apiEndPointPostCid = `hash/${userAddress}/`;
  await BackendClient.get(apiEndPointPostCid).then(async (res) => {
    if (res.data.detail) {
      await BackendClient.post("hash/", { user_id: userAddress, hash: "" });
    }
  });

  const cid = window.localStorage.getItem("cid");

  let fileData = client.get(cid);
  let data;

  for await (const itr of fileData) {
    data = Buffer.from(itr).toString();
  }

  let jsonData = JSON.parse(data);
  let newJsonData = [...jsonData, transaction];
  // newJsonData.push({transaction})

  let options = {
    wrapWithDirectory: false,
  };

  let newCid = await client.add(newJsonData, options);

  let updatedBufferOfServer = axios
    .patch(apiEndPointPostCid, { hash: newCid })
    .then((res) => {
      return res.data;
    });
  console.log(updatedBufferOfServer);
  window.localStorage.setItem("cid", newCid);
};

export default ipfsSaveFile;
