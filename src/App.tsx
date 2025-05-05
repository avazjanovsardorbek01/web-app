// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsDetailPage from "./pages/NewsDetailPage";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Container>
  );
}

export default App;
