import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueLocalStorage from 'vue-localstorage';

import App from './App.vue';

import GameMenu from './components/Menu.vue';
import Board from './components/Board.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.use(VueLocalStorage, {
  name: 'ls'
})

const routes = [
	{ path: '/', component: GameMenu },
	{ path: '', component: GameMenu },
	{ path: '/game/:difficulty', component: Board }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
