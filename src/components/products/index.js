import { memo, useCallback, useEffect, useState } from 'react'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import List from '../../components/list'
import Item from '../../components/item'
import Pagination from '../../components/pagination'
import PageLayout from '../page-layout'

function Products() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10) // Пригодится для пользовательского выбора кол-ва показа

  const store = useStore()

  useEffect(() => {
    const skip = currentPage * limit - limit

    currentPage * store.actions.catalog.loadLimit(limit, skip)
  }, [currentPage])

  const select = useSelector((state) => ({
    list: state.catalog.list,
  }))

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onChangePage: useCallback(
      (numPage) => setCurrentPage(numPage),
      [currentPage]
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
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        length={250} // Забил жестко, т.к. по API приходит только 10
        limit={limit}
        currentPage={currentPage}
        onChangePage={callbacks.onChangePage}
      />
    </PageLayout>
  )
}

export default memo(Products)
