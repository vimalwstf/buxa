import Navbar from "@/components/tools/Navbar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1 m-2 md:m-3 flex gap-2 md:gap-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
