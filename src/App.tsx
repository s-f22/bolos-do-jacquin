import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CakeList } from "./pages/CakeList.tsx";
import { CreateCake } from "./pages/Create.tsx";
import './App.css'
import { Footer } from "./components/Footer.tsx";
import { Login } from "./pages/Login.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cakes/:category" element={<CakeList />} />
          <Route path="/cakes/:category/:cakeId" element={<CakeList />} />
          <Route path="/cakes/search" element={<CakeList />} />
          {/* <Route path="/cakes/search/:cakeId" element={<CakeList />} /> */}
          <Route path="/cakes/create" element={<CreateCake />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
