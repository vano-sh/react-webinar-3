import { useState } from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(5)

  const cn = bem('Pagination')

  const numberPages = props.length / props.limit

  const btnPage = []

  const handleChangePageOnClick = (numPage) => {
    setCurrentPage(numPage)
    props.onChangePage(numPage)
  }

  for (let i = 1; i <= numberPages; i++) {
    btnPage.push(
      <button
        className={cn('btn')}
        key={i}
        onClick={() => handleChangePageOnClick(i)}
      >
        {i}
      </button>
    )
  }

  return (
    <div className={cn()}>
      {btnPage[0]}
      <span>...</span>
      {btnPage[currentPage - 2]}
      {btnPage[currentPage - 1]}
      {btnPage[currentPage]}
      <span>...</span>
      {btnPage[numberPages - 1]}
    </div>
  )
}

export default Pagination
