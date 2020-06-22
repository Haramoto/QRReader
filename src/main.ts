import Vue from 'vue';
import App from './App.vue';
import store from './store/';

import vuetify from './plugins/vuetify';

import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

// 戻るでページが表示されたときにリロード
window.history.replaceState(null, document.getElementsByTagName('title')[0].innerHTML, null);
window.addEventListener('popstate', (e) => {
  window.location.reload();
});
