import VueRouter from "vue-router";
import Szyfrator from "./views/Szyfrator";

const routes = [
    {
        path: "/",
        component: Szyfrator
    }
];

export default new VueRouter({
    routes,
    linkActiveClass: "is-active"
});