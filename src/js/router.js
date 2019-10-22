import VueRouter from "vue-router";
import Cipher from "./views/Cipher";

const routes = [
    {
        path: "/",
        component: Cipher
    }
];

export default new VueRouter({
    routes,
    linkActiveClass: "is-active"
});