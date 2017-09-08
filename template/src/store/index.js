import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import * as types from './mutation-types'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const state = {
    userInfo:{}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const actions = {
    /**
     * 设置用户信息
     * @param {*} param0 
     * @param {*Object} obj 需要存放在store.state.userInfo里面的任意对象 
     */
    setUserInfo({ commit, dispatch, state }, obj) {
        commit(types.SET_USER_INFO, obj);
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const getters = {}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
const mutations = {
    [types.SET_USER_INFO](state, obj) {
        Object.assign(state.userInfo, obj){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}