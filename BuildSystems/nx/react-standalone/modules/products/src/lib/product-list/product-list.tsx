import styles from './product-list.module.css';

// import { OrderList } from '@react-standalone/orders';

/* eslint-disable-next-line */
export interface ProductListProps {}

export function ProductList(props: ProductListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProductList!</h1>
      {/* <OrderList /> */}
    </div>
  );
}

export default ProductList;
