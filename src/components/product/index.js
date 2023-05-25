import { cn as bem } from '@bem-react/classname'
import './style.css'

function Product(props) {
  return (
    <div>
      <div>Описание: </div>
      <div>Страна производитель: </div>
      <div>Категория: </div>
      <div>Год выпуска: </div>
      <div>Цена: </div>
      <button>Добавить</button>
    </div>
  )
}

export default Product
