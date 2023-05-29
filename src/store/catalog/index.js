import { codeGenerator } from '../../utils'
import StoreModule from '../module'

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name)
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      limit: 10,
    }
  }

  async loadAll() {
    const response = await fetch('/api/v1/articles')
    const json = await response.json()
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    )
  }

  async loadLimit(limit, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`)
    const json = await response.json()
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    )
  }

  onChangePage(numPage) {
    this.setState(
      {
        ...this.getState(),
        currentPage: numPage,
      },
      `Номер страницы ${numPage}`
    )
  }

  onChangeLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit: limit,
      },
      `Установлен лимит ${limit}`
    )
  }
}

export default Catalog
