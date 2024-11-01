import AlertList from "@/components/tools/AlertList";
import AlertSidebar from "@/components/tools/AlertSidebar";

export default function Alert() {
  return (
    <>
      <AlertSidebar />
      <div className="flex-1">
        <AlertList />
      </div>
    </>
  );
}
