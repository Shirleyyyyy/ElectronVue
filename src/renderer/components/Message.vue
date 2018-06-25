<template>
    <div class="message-wrapper">
        <div class="chat-item-list">
            <div class="item" :class="{'item-selected' : currentChatItemIndex=== index}" v-for="(item, index) in chatItems" :key="index" @mouseup="onChangCurrentChatIten($event, index)">
                {{item.name}} 
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content-title">{{chatItems.length > 0 ? chatItems[currentChatItemIndex].name : '' }}</div>
            <div class="content-msg">
                {{messages && messages.length}}
                <div v-for="(msg, index) in messages" :key="index">
                    <div>{{msg.content}}</div>
                </div>
            </div>
            <textarea class="content-input" v-model="inputValue" placeholder="请输入消息, 以Enter结束" @keypress="onSendMsg"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      inputValue: ''
    };
  },
  computed: {
    chatItems() {
      return this.$store.state.message.chatItems;
    },
    currentChatItemIndex() {
      return this.$store.state.contact.selectChatItemIndex;
    },
    allMessages() {
      let userId = this.$store.state.message.user.id;
      let currentIndex = this.$store.state.contact.selectChatItemIndex;
      let herId = this.chatItems[currentIndex].id;
      let key = [userId, herId].sort().join(',');
      return this.$store.state.message.messages[key];
      // return this.$store.state.message.messages;
    },
    ...mapState({
      messages(state) {
        return state.message.messages;
      }
    })
  },
  watch: {
    messages: {
      handler: function(val, oldVal) {
        let userId = this.$store.state.message.user.id;
        let currentIndex = this.$store.state.contact.selectChatItemIndex;
        let herId = this.chatItems[currentIndex].id;
        let key = [userId, herId].sort().join(',');
        if (!this.$store.state.message.messages.hasOwnProperty(key)) {
          return;
        }
        this.messages = this.$store.state.message.messages[key];
      },
      deep: true
    },
    allMessages: {
      handler: function (val, oldVal) {
        console.log(val, oldVal);
      },
      deep: true
    }
  },
  methods: {
    onChangCurrentChatIten(e, index) {
      switch (e.button) {
        case 0: // 左键
          this.$store.dispatch('changeCurrentChatItemIndex', index);
          break;

        case 1: // 中键
          break;

        case 2: // 右键
          this.$store.dispatch('deleteChatItem', index);
          break;
      }
    },
    onSendMsg(e) {
      if (e.keyCode !== 13) {
        return;
      }
      e.preventDefault();
      if (
        this.inputValue === null ||
        this.inputValue === undefined ||
        this.inputValue === ''
      ) {
        return;
      }
      // enter键
      this.$store.dispatch('sendMsg', {
        contact: this.chatItems[this.currentChatItemIndex],
        content: this.inputValue
      });
      this.inputValue = '';
    }
  }
};
</script>

<style scoped>
.message-wrapper {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px 0 #e6e6e6;
}

.chat-item-list {
  width: 100px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e9e9ee;
}

.item {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
}

.item:last-child {
  border-bottom: none;
}

.item-selected {
  background: gray;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-title {
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding-right: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.content-msg {
  flex: 1;
}

.content-input {
  height: 60px;
}
</style>
