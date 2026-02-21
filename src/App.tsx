import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Context from './pages/Context'
import Financials from './pages/Financials'
import Research from './pages/Research'
import Strategy from './pages/Strategy'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
        <Route path="context" element={<Context />} />
        <Route path="financials" element={<Financials />} />
        <Route path="research" element={<Research />} />
        <Route path="strategy" element={<Strategy />} />
        <Route path="documents" element={<Documents />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
