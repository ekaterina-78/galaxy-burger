import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useMemo } from 'react';
import { INGREDIENT_PROP_TYPES } from '../../utils/propTypes';
import mainAreaStyles from './main-area.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const MainArea = ({ burgerIngredients }) => {
  // TODO: replace with Drag'n'Drop user choice
  const testConstructorIngredients = useMemo(() => {
    const bunIng = burgerIngredients.find(ing => ing.type === 'bun');
    const midIngs = burgerIngredients.slice(1, -1);
    return [bunIng, midIngs];
  }, [burgerIngredients]);

  return (
    <main className={cn(mainAreaStyles.main_area, 'p-10')}>
      <div className={mainAreaStyles.section_container}>
        <>
          <section className={mainAreaStyles.section}>
            <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
            <BurgerIngredients burgerIngredients={burgerIngredients} />
          </section>
          <section className={cn(mainAreaStyles.section, 'pt-15')}>
            <BurgerConstructor
              bunIngredient={testConstructorIngredients[0]}
              midIngredients={testConstructorIngredients[1]}
            />
          </section>
        </>
      </div>
    </main>
  );
};

MainArea.propTypes = {
  burgerIngredients: PropTypes.arrayOf(INGREDIENT_PROP_TYPES).isRequired,
};
