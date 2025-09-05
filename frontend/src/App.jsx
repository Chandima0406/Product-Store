import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"} bg={"gray.50"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Box>
  );
}

export default App;