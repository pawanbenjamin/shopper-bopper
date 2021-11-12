import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth";
import Products from "./components/Products";
import Nav from "./components/Nav";
import Cart from "./components/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/register">
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/login">
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
