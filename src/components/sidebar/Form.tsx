import { useState } from "react";
import { CiPen } from "react-icons/ci";
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
  const [isVisible, setIsVisible] = useState(false);
  const toggleForm = () => setIsVisible(!isVisible);

  const SidebarForm = (
    <form
      onSubmit={(e) => {
        onSubmit(e);
        toggleForm();
      }}
      className="element w-full h-full flex flex-col justify-between overflow-y-scroll rounded-md bg-primary-light p-4"
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

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-transform transform md:hidden ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300`}
      >
        <div className="relative w-full h-full bg-blue shadow-lg">
          {SidebarForm}
        </div>
      </div>
      <div className="hidden md:block md:w-[30%] lg:w-[25%]">{SidebarForm}</div>
      <div className="fixed bottom-2 right-2 z-50">
        <div
          className="bg-secondary-disabled rounded-lg shadow-lg p-3 cursor-pointer md:hidden"
          onClick={toggleForm}
        >
          <CiPen className="text-2xl text-gray-800" />
        </div>
      </div>
    </>
  );
}
