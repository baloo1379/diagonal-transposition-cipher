<template>
  <div>
    <Navbar></Navbar>
    <div class="section">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "Home",
  components: { Navbar, Footer }
};
</script>

<style>
</style>