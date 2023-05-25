import { cn as bem } from '@bem-react/classname'
import './style.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Product() {
  const [product, setProduct] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      .then((response) => response.json())
      .then((data) => setProduct(data.result))
  }, [id])

  console.log({ product })

  if (!product) return
  return (
    <div>
      <div>{product.description}</div>
      <div>
        Страна производитель:
        {`${product.madeIn.title} (${product.madeIn.code})`}
      </div>
      <div>Категория: {product.category.title}</div>
      <div>Год выпуска: {product.edition}</div>
      <div>Цена: {product.price}</div>
      <button>Добавить</button>
    </div>
  )
}

export default Product
