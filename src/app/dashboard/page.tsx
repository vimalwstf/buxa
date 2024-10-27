import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Stats from "@/components/dashboard/Stats";
import Table from "@/components/dashboard/Table";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col mr-5">
        <Navbar />
        <div className=" flex">
          <div className="flex-1 flex flex-col">
            <Stats />
            <Table />
          </div>
          <Alerts />
        </div>
      </div>
    </div>
  );
}
