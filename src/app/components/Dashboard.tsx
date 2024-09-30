import Sidebar from "./Sidebar";


const Dashboard = () => {
  return (
    <main className="w-full max-w-6xl p-8 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Sidebar />
        {/* <div className="col-span-2">
          <Editor />
        </div> */}
      </div>
    </main>
  );
};

export default Dashboard;
