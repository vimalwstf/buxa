export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-custom-gradient h-full lg:overflow-hidden ">
      {children}
    </div>
  );
}
