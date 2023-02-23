import { Module } from 'vuex';
import Cookies from 'js-cookie';
import userStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const userModule: Module<userStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    user: {
      id: '16be8ef7-5fb7-4557-8480-72a9de6dddba'
    },
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
};
export default userModule;
