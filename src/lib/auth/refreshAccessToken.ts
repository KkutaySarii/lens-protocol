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

  async function fetchData<TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
  ): Promise<TData> {
    const res = await fetch("https://api-mumbai.lens.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  }

  //3. Store the new access token in local storage

  const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      },
    }
  );

  const { accessToken, refreshToken: newRefreshToken } = result.refresh;

  setAccessToken(accessToken, newRefreshToken);

  return accessToken as string;
}
