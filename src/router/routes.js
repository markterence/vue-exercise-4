import { lazyLoadView } from "./lazyLoadView";
// import Home from '@src/views/Home'
export default [
  {
    path: "/",
    component: () => lazyLoadView(import("@src/views/Home"))
  },
  {
    path: "/toodoo",
    component: () => lazyLoadView(import("@src/views/Todo/TodoHome"))
  }
];
