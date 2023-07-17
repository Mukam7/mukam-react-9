import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginP from "./pages/LoginP";
import CategoriesP from "./pages/CategoriesP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LoginP />} />
          <Route path="categories" element={<CategoriesP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
