import { CSSProperties } from "react";

export default function GlassCss({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const BorderGradient: CSSProperties = {
    borderImageSource:
      "linear-gradient(102.15deg, rgba(166, 255, 124, 0.3) -36.38%, rgba(99, 102, 241, 0.3) 139.45%)",
    borderImageSlice: "1",
    borderRadius: "15px",
    borderWidth:"1px",
    borderStyle: "solid",
    overflow: "hidden",
  };

  return (
    <div className="rounded-md">
    <div
      className="bg-primary-light/30 rounded-md border backdrop-filter backdrop-blur-md"
      style={BorderGradient}
    >
      {children}
    </div>
    </div>
  );
}