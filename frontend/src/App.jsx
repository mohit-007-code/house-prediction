import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Result from "./pages/Result";
import ResultCard from "./components/ResultCard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/result" element={<Result />} />
        <Route path="/card" element={<ResultCard />} />
      </Routes>
    </BrowserRouter>
  );
}
