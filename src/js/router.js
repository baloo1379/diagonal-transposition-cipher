import VueRouter from "vue-router";
import Cipher from "./views/BasicCipher";

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