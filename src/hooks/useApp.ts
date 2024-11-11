import { createContext } from "react";
import { App } from "obsidian";
import { useContext } from "react";

export const AppContext = createContext<App | undefined>(undefined);

export const useApp = (): App | undefined => {
  return useContext(AppContext);
};
