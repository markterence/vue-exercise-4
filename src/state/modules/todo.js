/* eslint-disable no-unused-vars */
export const state = {
  cardList: []
};

export const mutations = {
  ADD_CARD(state, card) {
    state.cardList.push({
      cardTitle: card.cardTitle
    });
  }
};

export const getters = {
  getCardList(state) {
    return state.cardList;
  }
};

export const actions = {
  createCard({ commit, dispatch }, card) {
    commit("ADD_CARD", card);
  }
};
