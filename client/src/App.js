import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import EditorModal from "./pages/EditModal";
import SIgnIn from "./pages/SIgnIn";
import SIgnUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function App() {
  const [userDesigns, setUserDesigns] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SIgnIn />} />
        <Route path="/signup" element={<SIgnUp />} />
        <Route path="/" exact element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <Home userDesigns={userDesigns} setUserDesigns={setUserDesigns} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
