import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";


export default function DefaultLayout() {
  return (
    <div className="bg-background text-white h-dvh flex">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}