import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";

import Learning from "@/pages/Learning";
import Market from "@/pages/Market";
import Resume from "@/pages/Resume";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<div className="p-4">Dashboard (Coming Soon)</div>} />
          <Route path="resume" element={<Resume />} />
          <Route path="learning" element={<Learning />} />
          <Route path="market" element={<Market />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
