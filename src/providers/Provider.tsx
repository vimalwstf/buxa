"use client";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import StoreProvider from "@/app/StoreProvider";
import { Session } from "next-auth";
type CustomSessionProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

const CustomProvider = ({ children, session }: CustomSessionProviderProps) => {
  return (
    <StoreProvider>
      <SnackbarProvider maxSnack={3}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </SnackbarProvider>
    </StoreProvider>
  );
};

export default CustomProvider;
