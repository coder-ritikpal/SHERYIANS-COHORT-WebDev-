import { useState } from "react";
import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <Create />
      <Read />
    </div>
  );
};

export default App;
