import { memo, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import useStore from '../../store/use-store'
import Products from '../../components/products'
import Product from '../../components/product'

function Main() {
  const store = useStore()

  useEffect(() => {
    store.actions.catalog.loadList()
    store.actions.catalog.loadCount()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='products/:id' element={<Product />} />
    </Routes>
  )
}

export default memo(Main)
