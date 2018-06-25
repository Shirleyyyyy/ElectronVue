<template>
  <div class="wrapper">
    <div class="tab-bar">
      <div :class="[index===0 ? 'item-contact item-contact-selected' : 'item-contact']" @click="index = 0" >联系人</div>
      <div class="item-contact" :class="{'item-contact-selected' : index === 1}" @click="index = 1" >消息</div>
    </div>
    <contacts class="contact-wrapper" v-if="index === 0" :switchToMessage="switchToMessage" />
    <message class="contact-wrapper" v-if="index === 1" />
  </div>
</template>

<script>
import Contacts from '@/components/Contacts';
import Message from '@/components/Message';

export default {
  name: 'work-beach',
  data: function () {
    return {
      index: 0
    };
  },
  components: {
    Contacts,
    Message
  },
  methods: {
    switchToMessage(contact) {
      this.index = 1;
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.tab-bar {
  width: 100px;
  height: 100%;
  border-right: 1px solid gray;
}

.item-contact {
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.item-contact-selected {
  background: #a4cdf7;
}

.contact-wrapper {
  position: absolute;
  left: 100px;
}
</style>
