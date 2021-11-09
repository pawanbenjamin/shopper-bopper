import "./App.css";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/products">Products</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Route path="/register">
            <Auth />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/login">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
