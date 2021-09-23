import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";

async function getWeb3() {
  let providerOptions;
  let web3Modal;
  let web3;

  providerOptions = {
    authereum: {
      package: Authereum, // required
    },

    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "https://data-seed-prebsc-1-s1.binance.org:8545/", // required
      },
    },

    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_7E6A277E15DE415B", // required
      },
    },
  };

  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: false,
    disableInjectedProvider: false,
    providerOptions,
  });

  const provider = await web3Modal.connect();

  // provider.on("accountsChanged", (accounts: string[]) => {
  //
  // });
  //
  // // Subscribe to chainId change
  // provider.on("chainChanged", (chainId: number) => {
  //   console.log(chainId);
  // });
  //
  // // Subscribe to provider connection
  // provider.on("connect", (info: { chainId: number }) => {
  //   console.log(info);
  // });
  //
  // // Subscribe to provider disconnection
  // provider.on("disconnect", (error: { code: number; message: string }) => {
  //   console.log(error);
  // });

  web3 = new Web3(provider);
  return web3;
}

export default getWeb3
