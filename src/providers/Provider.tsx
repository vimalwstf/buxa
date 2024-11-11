"use client";


import { SnackbarProvider } from "notistack";
import StoreProvider from "@/providers/StoreProvider";
// import { Session } from "next-auth";

type CustomSessionProviderProps = {
  children: React.ReactNode;
  // session: Session | null;
};

const CustomProvider = ({ children }: CustomSessionProviderProps) => {
  return (
    <StoreProvider>
      <SnackbarProvider maxSnack={3}>
      {children}
      </SnackbarProvider>
    </StoreProvider>
  );
};

export default CustomProvider;
