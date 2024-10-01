import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <main className="w-full  p-8 mt-20">
      <div className="flex">
        <div className="w-1/3">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <DocumentList />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
