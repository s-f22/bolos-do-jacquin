import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CakeList } from "./pages/CakeList.tsx";
import { CreateCake } from "./pages/CreateCake.tsx";
import { EditCake } from "./pages/EditCake.tsx";
import { CakeDetails } from "./pages/CakeDetails.tsx";
import './App.css'
import { Header } from "./components/Header.tsx";
import { Login } from "./pages/Login.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cakes" element={<CakeList />} />
          <Route
            path="/cakes/create"
            element={
              <PrivateRoute>
                <CreateCake />
              </PrivateRoute>
            }
          />
          <Route path="/cakes/:id" element={<CakeDetails />} />
          <Route
            path="/cakes/:id/edit"
            element={
              <PrivateRoute>
                <EditCake />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
