import types from '../Types';

export default {
  state: {
    user: {
      id: Date.now(),
      name: 'Me'
    },
    messages: {
      haha: [1, 2]
    },
    chatItems: []
  },
  mutations: {
    [types.SEND_MESSAGE]: (state, msg) => {
      let key = [msg.from, msg.to].sort().join(',');
      if (!state.messages.hasOwnProperty(key)) {
        state.messages[key] = [];
      }
      // state.messages[key].push(msg);
      state.messages[key].splice(state.messages[key].length, 0, msg);
    },
    [types.RECEIVE_MESSAGE]: (state, msg) => {
      let key = [msg.from, msg.to].sort().join(',');
      if (!state.messages.hasOwnProperty(key)) {
        state.messages[key] = [];
      }
      // state.messages[key].push(msg);
      state.messages[key].splice(state.messages[key].length, 0, msg);
    },

    [types.UPDATE_CHATITEM]: (state, chatItem) => {
      let index = state.chatItems.findIndex(item => {
        return item.id === chatItem.id;
      });
      if (index >= 0) {
        // 存在，则只需更新select index
        state.selectChatItemIndex = index;
      } else {
        // 没有，则新增
        let temp = {
          ...chatItem,
          time: 0
        };
        state.chatItems.unshift(temp);
        state.selectChatItemIndex = 0;

        let key = [chatItem.id, state.user.id].sort().join(',');
        if (!state.messages.hasOwnProperty(key)) {
          state.messages[key] = [];
        }
      }
    },
    [types.CHANGE_CURRENT_CHATEITEM_INDEX]: (state, index) => {
      state.selectChatItemIndex = index;
    },
    [types.DELETE_CHATITEM]: (state, index) => {
      state.chatItems.splice(index, 1);
    }
  },
  actions: {
    sendMsg: ({ commit, state }, { contact, content }) => {
      let msg = {
        from: state.user.id,
        to: contact.id,
        content: content,
        time: Date.now()
      };
      commit(types.SEND_MESSAGE, msg);

      // 模拟发送一条就收到一条消息
      let receive = {
        from: contact.id,
        to: state.user.id,
        content: content
          .split('')
          .reverse()
          .join(''),
        time: Date.now()
      };
      commit(types.RECEIVE_MESSAGE, receive);
    },

    /**
     * 添加或者更新消息项
     */
    updateChatItem: ({ commit, state }, contact) => {
      commit(types.UPDATE_CHATITEM, contact);
    },
    /**
     * 改变当前选中的消息项
     */
    changeCurrentChatItemIndex: ({ commit }, index) => {
      commit(types.CHANGE_CURRENT_CHATEITEM_INDEX, index);
    },
    /**
     * 删除消息项
     */
    deleteChatItem: ({ commit }, index) => {
      commit(types.DELETE_CHATITEM, index);
    }
  }
};
