import Navbar from "@/components/tools/Navbar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-screen">
      <Navbar />
      {children}
    </div>
  );
}
