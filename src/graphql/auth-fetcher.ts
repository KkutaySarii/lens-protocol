import { isTokenExpired, readAccessToken } from "../lib/auth/helper";
import refreshAccessToken from "../lib/auth/refreshAccessToken";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  const getAccessToken = async () => {
    //1. Check if we have an access token in local storage
    const token = readAccessToken();

    //2. If there is no access token, return null

    if (!token) return null;

    let accessToken = token.accessToken;

    //3. If there is an access token, check if it is expired
    if (isTokenExpired(token.exp)) {
      //4. If it is expired, refresh it
      const newToken = await refreshAccessToken();
      if (!newToken) return null;
      accessToken = newToken;
    }

    //Finally, return the access token
    return accessToken;
  };
  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch("https://api.lens.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "x-access-token": token || "",
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
  };
};
