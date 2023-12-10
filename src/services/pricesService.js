import { $api } from '../common/api'

class PricesService {
  #URL = 'price/location'

  getPrices() {
    return $api(this.#URL)
  }
}

export default new PricesService()
