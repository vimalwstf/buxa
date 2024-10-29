import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
