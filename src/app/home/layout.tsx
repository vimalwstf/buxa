import Footer from "@/components/landingPage/Footer";
import LandingNavbar from "@/components/landingPage/LandingNavbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      {children}
      <Footer />
    </>
  );
}
