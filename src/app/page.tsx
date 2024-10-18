"use client";

import { SnackbarProvider } from "notistack";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./home/home"), {
  ssr: false,
});

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Home />
    </SnackbarProvider>
  );
}
