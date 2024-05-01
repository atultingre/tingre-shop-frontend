import Header from "../Header/Header";
const Dashboard = ({ children }) => {
  return (
    <>
      <div className="min-h-full">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Dashboard;
