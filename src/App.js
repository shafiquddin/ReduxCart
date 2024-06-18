import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
  const cartVisiblity = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending...',
        message:'Sending cart data!'
      }))
      const response = await fetch(
        "https://react-a95e2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
       throw new Error('sending cart data failed!')
      }

      dispatch(uiActions.showNotification({
        status:'success',
        title:'Success!',
        message:'Send cart data Successfully!'
      }))
    }
    sendCartData().catch(error=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!',
        message:'sending cart data failed!'
      }))
    });
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
