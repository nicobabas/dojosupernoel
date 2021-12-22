import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChildrenList from "./components/ChildrenList";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ChildrenList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
