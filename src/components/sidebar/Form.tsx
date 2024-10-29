import SidebarSubmit from "../ui/SidebarSubmit";

export default function Form({
  children,
  heading,
  onSubmit,
  loading,
  variant,
  allFilled,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
  allFilled: boolean;
  heading: string;
  variant: "write" | "research" | "alert";
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="element h-dvh md:h-[calc(100dvh-6rem)] flex flex-col justify-between overflow-y-scroll w-full rounded-md border-2 border-primary-light bg-primary-light p-4"
    >
      <div>
        <h2 className="text-[1.3rem] font-semibold mb-4 text-text-light">
          {heading}
        </h2>
        {children}
      </div>
      <SidebarSubmit
        variant={variant}
        disabled={!allFilled}
        loading={loading}
      />
    </form>
  );
}
