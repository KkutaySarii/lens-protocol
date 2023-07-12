import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helper";
import { useDefaultProfileQuery } from "@/src/graphql/generated";

export default function useLensUser() {
  //1. Make a react query for the local storage Key
  const address = useAddress();

  const localStorageQuery = useQuery(
    ["lens-user", address],
    //Writing the actual function to check the local storage
    () => readAccessToken()
  );

  //If there is a connected wallet,
  //Then we can  ask for default profile from Lens
  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address,
    }
  );

  return {
    //Contains information about both local storage
    //AND the information about the Lens Profile
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  };
}
