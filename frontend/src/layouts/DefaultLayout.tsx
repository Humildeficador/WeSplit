import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export default function DefaultLayout() {
  return (
    <div className="bg-[#0a0c12] text-white h-dvh flex">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}