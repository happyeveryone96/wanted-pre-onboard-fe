import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import ToDo from "./pages/ToDo/ToDo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
