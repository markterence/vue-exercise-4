// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// eslint-disable-next-line no-unused-vars
const registerVueComponents = requireComponent => {
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    // Get the PascalCase version of the component name
    const componentName = upperFirst(
      // Remove the "./_" from the beginning (if any)
      // Remove the file extension from the end
      camelCase(fileName.replace(/^\.\/_/, "").replace(/\.\w+$/, ""))
    );
    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
};

// https://github.com/webpack/webpack/issues/4772#issuecomment-358573955
// `require.context`'s arguments must be static and not be variables.
registerVueComponents(require.context(".", false, /_base-[\w-]+\.vue$/));
registerVueComponents(
  require.context("./Common", false, /[a-z0-9]+\.(jsx?|vue)$/i)
);