import { ClientsTable } from "./components/ClientsTable";

function App() {
  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Clients</h1>
        </div>{" "}
        <ClientsTable />
      </div>
    </>
  );
}

export default App;
