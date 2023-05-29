import { memo, useCallback, useEffect } from 'react'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import List from '../../components/list'
import Item from '../../components/item'
import Pagination from '../../components/pagination'
import PageLayout from '../page-layout'

function Products() {
  const store = useStore()

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
  }))

  useEffect(() => {
    const skip = select.currentPage * select.limit - select.limit

    store.actions.catalog.loadLimit(select.limit, skip)
  }, [select.currentPage])

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onChangePage: useCallback(
      (numPage) => store.actions.catalog.onChangePage(numPage),
      [select.currentPage]
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
        limit={select.limit}
        currentPage={select.currentPage}
        onChangePage={callbacks.onChangePage}
      />
    </PageLayout>
  )
}

export default memo(Products)
