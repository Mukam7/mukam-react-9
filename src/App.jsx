import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginP from "./pages/LoginP";
import CategoriesP from "./pages/CategoriesP";
import ActorMovie from "./pages/ActorMovie";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginP />} />
        <Route path="/" element={<Layout />}>
          <Route path="categories" element={<CategoriesP />} />
          <Route path="user/:id/movie" element={<ActorMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
