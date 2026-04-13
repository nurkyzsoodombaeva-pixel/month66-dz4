import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/header";
export function App() {
  return (
    <>
       <Header />
      <Outlet />
    </>
  );
}
