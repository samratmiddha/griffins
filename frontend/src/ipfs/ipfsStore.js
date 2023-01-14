import axios from "axios";
import { create } from "ipfs-http-client"

const ipfsClient = async () => {
    const ipfs = await create({
        host: `localhost`,
        port: 5002,
        protocol: `http`
    });

    console.log(ipfs);
    return ipfs;
}

const ipfsSaveFile = async (transaction) => {
    const client = await ipfsClient();
    const apiEndPointPostCid = "";

    const cid = window.localStorage.getItem("cid");

    let fileData = client.get(cid)
    let data;

    for await (const itr of fileData) {
        data = Buffer.from(itr).toString()
    }

    let jsonData = JSON.parse(data)
    let newJsonData = [...jsonData, transaction]
    // newJsonData.push({transaction})

    let options = {
        wrapWithDirectory: false,
    }
    
    let newCid = await client.add(newJsonData, options);
    
    let updatedBufferOfServer = axios.post(apiEndPointPostCid, {});
    console.log(updatedBufferOfServer);
    window.localStorage.setItem("cid", newCid);
}

export default ipfsSaveFile
