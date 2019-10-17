import { LIST_STORAGE_KEY } from "../../config/storage.keys";
const schema = {
  cardList: []
};
export default {
  load: function() {
    let list = JSON.parse(
      localStorage.getItem(LIST_STORAGE_KEY) || JSON.stringify(schema)
    );
    list.cardList.forEach(function(card, index) {
      card.id = index;
    });
    return list;
  },
  persist: function(data) {
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(data));
  }
};
