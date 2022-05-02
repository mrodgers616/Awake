import { createContext, useContext, useEffect, useState } from "react";
import * as libWeb3 from "../lib/web3";
import { ethers } from "ethers";
import ClimateDAO from "../abi/ClimateDAO.json";
import firebase from "../lib/firebase";
import { add } from "date-fns";

type State = {
  hasWeb3: boolean;
  walletAddress: string | null;
  ensName: string | null;
  earthBalance: string | null;
  name: string | null;
  error: string | null;
  chainId: number | null;
  hasEnoughBalance: boolean;
  web3Errors: string | null;
};

interface ContextValue extends State {
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  createProposal: (address: string, description: string) => Promise<any>;
  createGovernanceProposal: (
    address: string,
    description: string,
    contractAddress: string,
    contractAbi: Array<Record<string, any>>,
    functionName: string,
    functionInputs: Array<string>
  ) => Promise<any>;
}

const Web3Context = createContext<ContextValue | undefined>(undefined);

function getInitialState(): State {
  return {
    walletAddress: libWeb3.getWalletAddress(),
    ensName: libWeb3.getENSName(),
    hasWeb3: libWeb3.hasWeb3(),
    earthBalance: null,
    chainId: null,
    name: null,
    error: null,
    hasEnoughBalance: false,
    web3Errors: null
  };
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const balanceThreshold = ethers.utils.parseUnits("0.0", 18);
  const [state, setState] = useState<State>(getInitialState());
  // const { addProposalToStore } = useFirebase();
  // run this once when the app first loads to check if someone has an already connected a wallet in
  // local storage but hasn't yet loaded the ENS name because maybe it's newly registered.
  useEffect(() => {
    if (state.walletAddress && !state.ensName) {
      libWeb3.loadENSName(state.walletAddress).then((ensName) => {
        setState({ ...state, ensName });
      });
    }

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // set up event listeners.
      const governanceContract = new ethers.Contract(
        libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
        ClimateDAO.abi,
        signer
      );

      // check if wallet was previously connected.
      if (localStorage.getItem('wallet')) {
        provider.send('eth_requestAccounts', []);
      } 

      provider
        .getNetwork()
        .then((network) => {
          setState({ ...state, chainId: network.chainId });
        })
        .catch((err) => {
          setState({ ...state, web3Errors: err.message });
        });

      libWeb3.getEarthBalance().then((balance) => {
        const bal = ethers.utils.parseUnits(balance.toString(), 18);
        setState({ ...state, earthBalance: balance.toString() });
        setState({ ...state, hasEnoughBalance: bal >= balanceThreshold });
      });

      window.ethereum.on("chainChanged", (_chainId: any) =>
        window.location.reload()
      );

      // listen for new proposals.
      governanceContract.on(
        "ProposalCreated",
        async (
          proposalId,
          proposer,
          _targets,
          _values,
          _signatures,
          _calldatas,
          _startBlock,
          _endBlock,
          description
        ) => {
          const createdAt = new Date().toISOString();
          const deadline = add(new Date(), { hours: 1 }).toISOString();
          firebase.updateProposalInStore(description, {
            proposalId: proposalId.toString(),
            proposer: proposer.toString(),
            createdAt,
            deadline,
            votes: {
              for: 0,
              against: 0,
              abstain: 0,
            },
          });
        }
      );

      governanceContract.on(
        "VoteCast",
        (_account, _proposalId, _support, _weight, _reason) => {
          // fetch the proposal in db.
          // getDoc(collection(getFirestore(), 'proposals'), proposalId.toString()).then((proposal) => {
          // update the totals.
          console.log("vote cast");
        }
      );
    }
  }, []);

  async function getProposalState(proposalId: number): Promise<any> {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const goveranceContract = new ethers.Contract(
          libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
          ClimateDAO.abi,
          signer
        );
        return await goveranceContract.state(proposalId);
      }
    } catch (err) {
      setState({ ...state, web3Errors: (err as any).message });
    }
  }

  async function getProposalVotes(_proposalId: string): Promise<any> {
    try {
      const { ethereum } = window;
      if (!state.walletAddress) {
        setState({ ...state, web3Errors: "Connect your wallet." });
        throw new Error("Connect your wallet.");
      }
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const goveranceContract = new ethers.Contract(
          libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
          ClimateDAO.abi,
          signer
        );
        const blocknumber = await provider.getBlockNumber();
        console.log(blocknumber);
        return await goveranceContract.getVotes(
          state.walletAddress,
          blocknumber - 1
        );
      }
    } catch (err) {
      if ((err as any).code === 3) {
        console.error((err as any).message);
      }
    }
  }

  async function createProposal(
    sender: string,
    description: string
  ): Promise<void> {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // setup goverance contract.
        const goveranceContract = new ethers.Contract(
          libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
          ClimateDAO.abi,
          signer
        );

        const block = (await provider.getBlockNumber()) - 1;
        const callData = goveranceContract.interface.encodeFunctionData(
          "getVotes",
          [sender, block]
        );

        // create the proposal.
        await goveranceContract.propose([sender], [0], [callData], description);
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async function createGovernanceProposal(
    sender: string,
    description: string,
    contractAddress: string,
    contractAbi: Array<Record<string, any>>,
    functionName: string,
    functionInputs: Array<any>
  ): Promise<void> {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // setup goverance contract.
        const goveranceContract = new ethers.Contract(
          libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
          ClimateDAO.abi,
          signer
        );

        const contractToCall = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const callData = contractToCall.interface.encodeFunctionData(
          functionName,
          functionInputs
        );

        // create the proposal.
        await goveranceContract.propose([sender], [0], [callData], description);
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async function goveranceName(): Promise<string> {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const goveranceContract = new ethers.Contract(
          libWeb3.CLIMATEDAO_GOVERANCE_ADDRESS,
          ClimateDAO.abi,
          signer
        );
        return await goveranceContract.name();
      } else {
        return "";
      }
    } catch (err: any) {
      console.log(err);
      return "";
    }
  }

  async function connectWallet() {
    console.log("connect!!!");
    if (state.hasWeb3) {
      let connectResult = await libWeb3.connectWallet();
      if (connectResult !== false && connectResult.indexOf("0x") === 0) {
        setState({
          ...state,
          walletAddress: connectResult,
          ensName: libWeb3.getENSName(),
        });
      }
    } else {
      throw new Error("Browser is not Web3 enabled");
    }
  }

  async function disconnectWallet() {
    console.log("disconnectWallet");
    await libWeb3.disconnectWallet();
    setState(getInitialState());
  }

  const value: ContextValue = {
    connectWallet,
    disconnectWallet,
    isConnected: Boolean(state.walletAddress),
    createProposal,
    createGovernanceProposal,
    ...state,
  };
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3Context must be used within a <Web3Provider>");
  }
  return context;
}
