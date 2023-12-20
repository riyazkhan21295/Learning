import { Route, Routes } from 'react-router-dom';

import { ProductList } from '@react-standalone/products';
import { OrderList } from '@react-standalone/orders';

function Home() {
  return <h1>Home</h1>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
}

export default App;
