import { memo, useCallback, useEffect, useState } from 'react'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import BasketTool from '../../components/basket-tool'
import List from '../../components/list'
import Item from '../../components/item'
import Pagination from '../../components/pagination'
import Product from '../../components/product'
import { Route, Routes } from 'react-router-dom'

function Main() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10) // Пригодится для пользовательского выбора кол-ва показа

  const store = useStore()

  useEffect(() => {
    store.actions.catalog.load(limit, page)
  }, [page])

  const select = useSelector((state) => ({
    list: state.catalog.list,
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
    onChangePage: useCallback(
      (numPage) => setPage(() => numPage * limit - limit),
      [page]
    ),
  }

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />
      },
      [callbacks.addToBasket]
    ),
  }

  return (
    <PageLayout head={'Магазин'}>
      {/* <Head title='Магазин' /> */}
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route path='product/:id' element={<Product />} />
        <Route />
      </Routes>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        length={250} // Забил жестко, т.к. нет возможности получить все кол-во
        limit={limit}
        onChangePage={callbacks.onChangePage}
      />
    </PageLayout>
  )
}

export default memo(Main)
