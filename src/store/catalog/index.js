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
    }
  }

  async load(limit, skip = 0) {
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
}

export default Catalog
