import { memo } from 'react'
import PropTypes from 'prop-types'
import Head from '../head'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function PageLayout({ head, footer, children }) {
  const cn = bem('PageLayout')

  return (
    <div className={cn()}>
      <Head title={head} />
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default memo(PageLayout)
