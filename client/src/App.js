import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "./state";
import Auth from "./components/Auth";
import Products from "./components/Products";
import Nav from "./components/Nav";

function App() {
  const { state, dispatch } = useContext(store);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await fetch("/auth/me");
        const user = await response.json();
        console.log(user);
        dispatch({ type: "SET_USER", value: user });
      } catch (error) {
        console.log("USER NOT LOGGED IN");
      }
    };
    getMe();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`/api/orders/user/${state.user.id}/cart`);
      const cart = await response.json();
      dispatch({ type: "GET_CART", value: cart });
    };
    if (state.user) {
      setIsLoggedIn(true);
      getCart();
    }
  }, [state.user]);

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/register">
            <Auth />
          </Route>
          <Route path="/login">
            <Auth />
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
