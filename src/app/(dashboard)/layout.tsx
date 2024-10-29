export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-screen overflow-hidden">
      {children}
    </div>
  );
}
