import { ethers } from "ethers";
export const provider = new ethers.providers.JsonRpcProvider(
	process.env.REACT_APP_INFURA_URL
);
