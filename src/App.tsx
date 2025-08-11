import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CakeList } from "./pages/CakeList.tsx";
import { CreateCake } from "./pages/CreateCake.tsx";
import { EditCake } from "./pages/EditCake.tsx";
import { CakeDetails } from "./pages/CakeDetails.tsx";
import './App.css'
import { Footer } from "./components/Footer.tsx";
import { Login } from "./pages/Login.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import { CakeCategories } from "./components/CakeCategories.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cakes/:category" element={<CakeList />} />
          <Route
            path="/cakes/create"
            element={
              <PrivateRoute>
                <CreateCake />
              </PrivateRoute>
            }
          />
          <Route path="/cakes/:category/:id" element={<CakeDetails />} />
          <Route
            path="/cakes/:id/edit"
            element={
              <PrivateRoute>
                <EditCake />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
