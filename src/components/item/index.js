import { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import { numberFormat } from '../../utils'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  }

  return (
    <div className={cn()}>
      <Link to={`/products/${props.item._id}`} className={cn('title')}>
        <div>{props.item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item)
