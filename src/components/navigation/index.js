import React, { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import { cn as bem } from '@bem-react/classname'
import BasketTool from '../basket-tool'
import './style.css'

function Navigation() {
  const cn = bem('Navigation')

  const store = useStore()

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  }

  return (
    <div className={cn()}>
      <div className={cn('links')}>
        <Link to='/'>Главная</Link>
      </div>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </div>
  )
}

export default memo(Navigation)
