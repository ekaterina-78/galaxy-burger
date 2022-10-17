import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import blankImage from '../images/blank-image.png';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const MODAL_ROOT = document.getElementById('modal');

export const MENU_ITEMS = [
  {
    label: 'Конструктор',
    iconTag: BurgerIcon,
  },
  {
    label: 'Лента заказов',
    iconTag: ListIcon,
  },
  {
    label: 'Личный кабинет',
    iconTag: ProfileIcon,
  },
];

export const INGREDIENTS_TABS = [
  {
    label: 'Булки',
    type: 'bun',
  },
  {
    label: 'Соусы',
    type: 'sauce',
  },
  {
    label: 'Начинки',
    type: 'main',
  },
];

export const BUN_INGREDIENT_PLACEHOLDER = {
  _id: '0000000000000000',
  name: 'Перетащите булку в это поле \u{1F959}',
  type: 'bun',
  price: 0,
  image: blankImage,
  image_mobile: blankImage,
};
