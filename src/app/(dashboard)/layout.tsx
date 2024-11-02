export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-full lg:h-screen lg:overflow-hidden ">
      {children}
    </div>
  );
}
