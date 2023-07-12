import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import React from "react";

type Props = {};

const SignInButton = (props: Props) => {
  const address = useAddress(); //Detect the connected wallet address
  const isOnWrongNetwork = useNetworkMismatch(); //Detect if the connected wallet is on the wrong network
  const switchChain = useSwitchChain(); //Switch the connected wallet to the correct network

  //1. User needs to connect their wallet
  if (!address) {
    <ConnectWallet />;
  }

  //2. User needs to switch network to Polygon
  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchChain?.(ChainId.Mumbai)}>
        Switch to Polygon
      </button>
    );
  }

  return <div>SignInButton</div>;
};

export default SignInButton;
