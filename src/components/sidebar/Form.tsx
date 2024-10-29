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
      className="element h-[90vh] pb-32 sm:min-h-[87vh] overflow-y-scroll w-full rounded-md border-2 border-primary-light bg-primary-light p-4"
    >
      <h2 className="text-[1.3rem] font-semibold mb-4 text-text-light">
        {heading}
      </h2>
      {children}
      <SidebarSubmit
        variant={variant}
        disabled={!allFilled}
        loading={loading}
      />
    </form>
  );
}
