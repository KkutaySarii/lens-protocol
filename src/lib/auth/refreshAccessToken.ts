import { fetcher } from "@/src/graphql/auth-fetcher";
import { readAccessToken, setAccessToken } from "./helper";
import {
  RefreshDocument,
  RefreshMutation,
  RefreshMutationVariables,
} from "@/src/graphql/generated";

export default async function refreshAccessToken() {
  //1. Read access token from local storage
  const currentRefreshToken = readAccessToken()?.refreshToken;

  if (!currentRefreshToken) return null;

  //2. Send it to the Lens API to refresh it

  const result = await fetcher<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      },
    }
  )();

  //3. Store the new access token in local storage

  const { accessToken, refreshToken: newRefreshToken } = result.refresh;
  setAccessToken(accessToken, newRefreshToken);

  return accessToken as string;
}
