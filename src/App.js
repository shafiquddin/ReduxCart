import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartVisiblity = useSelector(state => state.ui.cartIsVisible)
  return (
    <Layout>
      {cartVisiblity && <Cart />} 
      <Products />
    </Layout>
  );
}

export default App;
