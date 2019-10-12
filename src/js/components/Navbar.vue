<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://github.com/baloo1379">
        <img src="https://www.gravatar.com/avatar/5ae4bdd28eb0082052d7cfa1fcd275af" />
      </a>

      <!-- <a
        role="button"
        class="navbar-burger burger"
        v-bind:class="{'is-active' : isActive}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>-->
    </div>

    <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isActive}">
      <!-- <div class="navbar-end">
        <router-link class="navbar-item" to="/" exact>Szyfrator</router-link>
      </div>-->
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleMenu() {
      if (this.isActive) this.isActive = false;
      else this.isActive = true;
    }
  }
};
</script>

<style>
</style>