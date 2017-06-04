import Vue from 'vue';
import App from './App.vue';
import GameMenu from './components/Menu.vue';
import Board from './components/Board.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

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
