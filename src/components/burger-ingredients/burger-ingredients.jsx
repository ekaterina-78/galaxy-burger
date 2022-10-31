import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { useSelector } from 'react-redux';
import { useIsInViewport } from '../../hooks/useIsInViewport';
import { selectBurgerIngredients } from '../../services/selectors/ingredients';
import { INGREDIENT_TABS } from '../../utils/const-variables/ingredient-variables';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const burgerIngredients = useSelector(selectBurgerIngredients);

  const categoryIngredients = useMemo(() => {
    if (!burgerIngredients) {
      return null;
    }
    const bunIds = burgerIngredients
      .filter(ing => ing.type === 'bun')
      .map(ing => ing._id);
    const sauceIds = burgerIngredients
      .filter(ing => ing.type === 'sauce')
      .map(ing => ing._id);
    const mainIds = burgerIngredients
      .filter(ing => ing.type === 'main')
      .map(ing => ing._id);
    return {
      bun: { ingredientIds: bunIds, categoryRef: React.createRef() },
      sauce: { ingredientIds: sauceIds, categoryRef: React.createRef() },
      main: { ingredientIds: mainIds, categoryRef: React.createRef() },
    };
  }, [burgerIngredients]);

  const [currentIngRef, setCurrentIngRef] = useState(
    categoryIngredients?.bun.categoryRef
  );

  const refInViewport = useIsInViewport(
    categoryIngredients
      ? Object.values(categoryIngredients).map(v => v.categoryRef)
      : []
  );

  useEffect(() => {
    setCurrentIngRef(refInViewport);
  }, [refInViewport]);

  const onTabSelected = category => {
    const ingRef = categoryIngredients[category].categoryRef;
    setCurrentIngRef(ingRef);
    ingRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className={burgerIngredientsStyles.tabs}>
        {categoryIngredients &&
          INGREDIENT_TABS.map(t => {
            return (
              <Tab
                key={t.type}
                value={t.type}
                active={
                  currentIngRef === categoryIngredients[t.type].categoryRef
                }
                onClick={onTabSelected}
              >
                {t.label}
              </Tab>
            );
          })}
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredients_container} custom-scroll`}
      >
        {categoryIngredients &&
          INGREDIENT_TABS.map(t => {
            return (
              <IngredientsCategory
                key={t.type}
                title={t.label}
                ingredientIds={categoryIngredients[t.type].ingredientIds}
                categoryRef={categoryIngredients[t.type].categoryRef}
              />
            );
          })}
      </div>
    </>
  );
};
