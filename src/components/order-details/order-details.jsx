import doneImage from '../../images/done.png';
import { useSelector } from 'react-redux';
import { selectOrderNumber } from '../../services/selectors/orders';
import orderDetailsStyles from './order-details.module.css';
import cn from 'classnames';

export const OrderDetails = () => {
  const orderNumber = useSelector(selectOrderNumber);

  return (
    <>
      <h1
        className={cn(orderDetailsStyles.order, 'text text_type_digits-large')}
      >
        {orderNumber.toString().padStart(6, '0')}
      </h1>
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-medium pt-8'
        )}
      >
        идентификатор заказа
      </p>
      <img className="p-15" src={doneImage} alt="Success" />
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-default'
        )}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          orderDetailsStyles.order_message,
          'text text_type_main-default text_color_inactive pt-2'
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
