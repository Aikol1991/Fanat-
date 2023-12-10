import { $api } from "../common/api";

class ContactsService {
  #URL = "contact/contact/";

  getAll() {
    return $api(`${this.#URL}`);
  }
}

export default new ContactsService();
