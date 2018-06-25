import types from '../Types';

export default {
  state: {
    contacts: []
  },
  mutations: {
    [types.ADD_CONTACT]: (state, contact) => {
      state.contacts.push(contact);
    },
    [types.DELETE_CONTACT]: (state, id) => {
      let index = state.contacts.findIndex(contact => {
        return contact.id === id;
      });
      if (index >= 0) {
        state.contacts.splice(index, 1);
      }
    }
  },
  actions: {
    /**
     * 新增联系人
     */
    addContact: ({ commit, state }) => {
      let contact = {
        id: Date.now(),
        name: 'Shirley' + state.contacts.length
      };
      commit(types.ADD_CONTACT, contact);
    },
    /**
     * 删除联系人
     */
    deleteContact: ({ commit }, contact) => {
      commit(types.DELETE_CONTACT, contact.id);
    }
  }
};
