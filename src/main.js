import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import router from "./router";
import store from "@src/state/store";

import "./components/bootstrap-vue";
import "./components/fontawesome-library";

import "@/src/components/_globals";
import App from "./App.vue";
Vue.config.productionTip = false;

Vue.component("FontAwesomeIcon", FontAwesomeIcon);

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// If running e2e tests...
if (process.env.VUE_APP_TEST === "e2e") {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app;
}
