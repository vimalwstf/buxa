import Alerts from "@/components/dashboard/Alerts";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import History from "@/components/dashboard/History";
import Stats from "@/components/dashboard/Stats";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col mr-5">
        <Navbar />
        <div className=" flex">
          <div className="flex-1 flex flex-col">
            <Stats />
            <History />
          </div>
          <Alerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
