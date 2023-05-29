import { cn as bem } from '@bem-react/classname'
import './style.css'

function Pagination(props) {
  const cn = bem('Pagination')

  const numberPages = props.length / props.limit

  const btnPage = []

  const handleChangePageOnClick = (numPage) => {
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

  switch (props.currentPage) {
    case 1:
      console.log(props.currentPage)
      return (
        <div className={cn()}>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )
    case 2:
      console.log(props.currentPage)
      return (
        <div className={cn()}>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )
    case numberPages - 1:
      console.log(btnPage[numberPages - 1])
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
        </div>
      )

    case numberPages:
      console.log(btnPage[numberPages - 1])
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
        </div>
      )

    default:
      return (
        <div className={cn()}>
          {btnPage[0]}
          <span>...</span>
          {btnPage[props.currentPage - 2]}
          {btnPage[props.currentPage - 1]}
          {btnPage[props.currentPage]}
          <span>...</span>
          {btnPage[numberPages - 1]}
        </div>
      )
  }
}

export default Pagination
