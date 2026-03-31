import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import RolesPage from "./pages/RolesPage"
import ListingsPage from "./pages/ListingsPage"
import ItemDetailPage from "./pages/ItemDetailPage"
import AskHelpPage from "./pages/AskHelpPage"
import DashboardPage from "./pages/DashboardPage"
import ListItemPage from "./pages/ListItemPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/ask-help" element={<AskHelpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/list-item" element={<ListItemPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App