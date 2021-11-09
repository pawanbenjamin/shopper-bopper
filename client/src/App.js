import "./App.css";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Register from "./components/Register";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/products">Products</Link>
        <Link to="/register">Register</Link>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
