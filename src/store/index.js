import Vue from 'vue';
import Vuex from 'vuex';
import contact from './modules/Contacts';
import message from './modules/Message';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    contact,
    message
  }
});

export default store;
