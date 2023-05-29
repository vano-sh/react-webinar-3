import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import PageLayout from '../page-layout'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Product() {
  const cn = bem('Product')

  const store = useStore()

  const { id } = useParams()

  useEffect(() => {
    store.actions.product.loadProduct(id)
  }, [id])

  const select = useSelector((state) => ({
    product: state.product.item,
  }))

  console.log(select.product)

  if (!select.product) return
  return (
    <PageLayout head={select.product.title}>
      <div className={cn()}>
        <div className={cn('description')}>{select.product.description}</div>
        <div className={cn('madeIn')}>
          <span>Страна производитель:</span>
          <span>
            {` ${select.product.madeIn.title} (${select.product.madeIn.code})`}
          </span>
        </div>
        <div className={cn('category')}>
          <span>Категория:</span>
          <span>{` ${select.product.category.title}`}</span>
        </div>
        <div className={cn('edition')}>
          <span>Год выпуска:</span>
          <span>{` ${select.product.edition}`}</span>
        </div>
        <div className={cn('price')}>
          <span>Цена:</span>
          <span>{` ${select.product.price}`}</span>
        </div>
        <button className={cn('btn')}>Добавить</button>
      </div>
    </PageLayout>
  )
}

export default memo(Product)
