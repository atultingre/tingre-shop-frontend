import Header from "../Header/Header";
const Dashboard = ({ children }) => {
  return (
    <>
      <div className="min-h-full mt-12">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Dashboard;
