import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./assets/footer.JPG";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/create";
import Dashboard from "./pages/dashboard";
import Rafflit from "./pages/Rafflit";
import Buy from "./pages/buy";
import Winners from "./pages/winners";
import Active from "./pages/active";
import { useAccount } from "wagmi";
import Works from "./pages/howItWorks";
import logo from "./assets/site-bg.jpg"
function App() {
  const account = useAccount();
  const address = account.address;

  return (
    <>
      <div className="App  ">
        <header className="App-header font-poppins text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create address={address} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rafflit" element={<Rafflit />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/active" element={<Active />} />
            <Route path="/works" element={<Works />} />
          </Routes>
        </header>
        {/* <img className="w-[100%]" src={Footer} alt="" /> */}
      </div>
    </>
  );
}

export default App;
