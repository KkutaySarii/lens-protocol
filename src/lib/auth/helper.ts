const STRORAGE_KEY = "LH_STORAGE_KEY";

// Simple function to check if the token is expired
export function isTokenExpired(exp: number) {
  if (!exp) return true;

  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
}

//1. Read access token from local storage
export function readAccessToken() {
  if (typeof window === "undefined") return null;

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Local storage is not available");
  }

  const data = ls.getItem(STRORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data) as {
    accessToken: string;
    refreshToken: string;
    exp: number;
  };
}

//2. Set access token to local storage
export function setAccessToken(accessToken: string, refreshToken: string) {
  //1. Parse the JWT token that comes back and extract the expiration time
  const { exp } = parseJWT(accessToken);

  //2. Set all values to local storage
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Local storage is not available");
  }

  ls.setItem(STRORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
}

//3. Parse the JWT token that comes back and extract the expiration time
export function parseJWT(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
