import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { useAuthenticateMutation } from "@/src/graphql/generated";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  //0. Make sure the user has a connected wallet
  const address = useAddress();

  const sdk = useSDK();

  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();

  //1. Write the actual async function

  async function login() {
    if (!address) return null;

    //1. Generate a challenge which comes from the Lens API
    const { challenge } = await generateChallenge(address);

    //2. Sign the challenge with the user's wallet
    const signature = await sdk?.wallet.sign(challenge.text);

    //3. Send the signed challenge back to the Lens API
    const { authenticate } = await sendSignedMessage({
      request: {
        address,
        signature,
      },
    });

    console.log(authenticate);

    //4. Receive a access token from the Lens API if we succeed
    //5. Store the access token in local storage so we can use it
  }

  //2. Return the login function with mutation function
  return useMutation(login);
}
