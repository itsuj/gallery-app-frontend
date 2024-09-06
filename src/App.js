import './App.css';
import "./components/ImageGallery"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageGallery from './components/ImageGallery';
function App() {
  return (
<Router>
  <Routes>
    <Route path="/" element={<ImageGallery/>} />
  </Routes>
</Router>
  );
}

export default App;
