export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-screen lg:overflow-hidden">
      {children}
    </div>
  );
}
