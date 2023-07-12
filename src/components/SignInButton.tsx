import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import React from "react";
import useLogin from "../lib/auth/useLogin";
import useLensUser from "../lib/auth/useLensUser";

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress(); //Detect the connected wallet address
  const isOnWrongNetwork = useNetworkMismatch(); //Detect if the user is on the wrong network
  const switchChain = useSwitchChain(); // Function to switch network
  const { mutate: requestLogin } = useLogin(); //Function to login with Lens
  const { isSignedInQuery, profileQuery } = useLensUser();

  //1. User needs to connect their wallet
  if (address === undefined) {
    return <ConnectWallet />;
  }

  //2. User needs to switch network to Polygon
  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchChain?.(ChainId.Mumbai)}>
        Switch to Polygon
      </button>
    );
  }

  // Loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>;
  }

  //If the user is not signed in, we need to request them to sign in
  if (!isSignedInQuery.data) {
    return (
      <button
        onClick={() => {
          requestLogin();
        }}
      >
        Sign In with Lens
      </button>
    );
  }

  //Loading their profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  //If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens profile</div>;
  }

  //If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return <div>Logged in as {profileQuery.data?.defaultProfile.handle}</div>;
  }
  return <div>Something went wrong</div>;
}
