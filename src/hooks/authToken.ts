import { useEffect, useState } from "react";

const STAGE = process.env.REACT_APP_STAGE;
const siteUrl = STAGE === "PROD" ? "https://boaspace.io/" : "https://testnet.boaspace.io/";
export const TOKEN_NAME = "authToken";

export const makeSignMessage = (account: string, chainId: string, nonce: string): string => {
  return (
    "BOA SPACE wants you to sign in with your AgoraNet account:\n" +
    account +
    "\n" +
    "\n" +
    "Please sign this message to confirm your identity.\n" +
    "\n" +
    "URI: " +
    siteUrl +
    "\n" +
    "Version: 1\n" +
    "Chain ID: " +
    chainId +
    "\n" +
    "Issued At: 2022-11-10T05:45:40.758Z" +
    "\n" +
    "Nonce: " +
    nonce
  );
};

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { token: value, setAuthToken: setValue };
}

//
// function useLocalStorage<T>(key: string, initialValue: T) {
//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       // Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       // Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       // If error also return initialValue
//       console.debug(error);
//       return initialValue;
//     }
//   });
//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//           value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.debug(error);
//     }
//   };
//   return [storedValue, setValue] as const;
// }
