import styles from './order-list.module.css';

import { Ui } from '@react-standalone/ui';

/* eslint-disable-next-line */
export interface OrderListProps {}

export function OrderList(props: OrderListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OrderList!</h1>

      <Ui />
    </div>
  );
}

export default OrderList;
