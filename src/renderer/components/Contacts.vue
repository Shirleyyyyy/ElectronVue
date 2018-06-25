<template>
  <div class="contact-wrapper">
    <div class="contact-list">
      <div class="item-contact" :class="{'item-contact-selected' : currentContact && currentContact.id === item.id}" v-for="(item, index) in contacts" :key="index" @mouseup="onChangeCurrentContact($event, item)">
        {{item.name}}
      </div>
      <div class="item-contact" :class="{'item-contact-selected' : currentContact && currentContact === add}"  @click="onAddContact">
        添加
      </div>
    </div>
    
    <div class="contact-content" @click="onReadyToChat">
      {{!currentContact ? '' : currentContact.name}}
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentContact: null,
      add: 'add'
    };
  },
  props: {
    switchToMessage: {
      type: Function,
      required: true
    }
  },
  computed: {
    contacts() {
      return this.$store.state.contact.contacts;
    }
  },
  methods: {
    onReadyToChat() {
      this.$store.dispatch('updateChatItem', this.currentContact);
      this.switchToMessage(this.currentContact);
    },
    onAddContact() {
      this.currentContact = this.add;
      this.$store.dispatch('addContact');
    },
    onChangeCurrentContact(e, item) {
      switch (e.button) {
        case 0: // 左键
          this.currentContact = item;
          break;

        case 1: // 中键
          break;

        case 2: // 右键
          this.$store.dispatch('deleteContact', item);
          break;
      }
    }
  }
};
</script>

<style scoped>
.contact-wrapper {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px 0 #e6e6e6;
}

.contact-list {
  width: 100px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e9e9ee;
}

.item-contact {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
}

.item-contact:last-child {
  border-bottom: none;
}

.item-contact-selected {
  background: gray;
}

.contact-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
