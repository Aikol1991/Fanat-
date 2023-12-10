import { $api } from '../common/api'

class ServicesService {
  #URL = 'service/'

  getAll() {
    return $api(`${this.#URL}service`)
  }
}

export default new ServicesService()
