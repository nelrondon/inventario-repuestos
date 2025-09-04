import { createContext, useContext } from "react";

export const PartsContext = createContext();

export const useParts = () => useContext(PartsContext);
