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

const ipfsSaveFile = async () => {
    const client = await ipfsClient();

    let result = await client.add(`welcome1`);
    console.log(result);
}

export default ipfsSaveFile
