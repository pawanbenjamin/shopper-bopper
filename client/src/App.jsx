import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { userContext } from "./context/userContext";
import { cartContext } from "./context/cartContext";

import Auth from "./components/Auth";
import Products from "./components/Products";
import Nav from "./components/Nav";
import Cart from "./components/Cart";

function App() {
  const { userDispatch } = useContext(userContext);
  const { cartDispatch } = useContext(cartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      cartDispatch({
        type: "SET_CART",
        value: {
          items: [],
        },
      });
    }
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/register">
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/login">
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/products" isLoggedIn={isLoggedIn}>
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
