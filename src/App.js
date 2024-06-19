import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData,fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const cartVisiblity = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return
    }
    dispatch(sendCartData(cart))
  }, [cart,dispatch]);

  return (
    <Fragment>
     {notification && <Notification {...notification}/>} 
      <Layout>
      {cartVisiblity && <Cart />}
      <Products />
    </Layout>
    </Fragment>

  );
}

export default App;
