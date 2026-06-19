import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import { Dashboard } from "./pages/Dashboard"
import { Group } from "./pages/Group"
import { Settings } from "./pages/Settings"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/group" element={<Group />}/>
        <Route path="/settings" element={<Settings />}/>
      </Route>
    </Routes>
  )
}

export default App