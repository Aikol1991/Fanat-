import { $api } from "../common/api";

class VacanciesService {
  #URL = "vacancies/vacancy/";

  getAll() {
    return $api(`${this.#URL}`);
  }
}

export default new VacanciesService();
