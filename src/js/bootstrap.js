import Vue from 'vue';
import VueRouter from "vue-router";
import axios from "axios";

window.Vue = Vue;
Vue.use(VueRouter);
window.axios = axios;

window.b64DecodeUnicode = function (str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
};