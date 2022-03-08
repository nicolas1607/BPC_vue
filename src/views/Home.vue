<template>
  <div class="content">
    <router-link
      class="home animate__animated animate__bounceIn animate__slow"
      style="--animate-duration: 1.4s"
      to="choices"
    >
      <img class="nav-home-img" :src="require(`../assets/logo.png`)" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    // INTEGER
    localStorage.teamId = 2;
    localStorage.nbTeam = 1;
    localStorage.nbTours = 0;
    localStorage.totalMatch = 0;

    // STRINGS //
    localStorage.play1 = "";
    localStorage.play2 = "";

    // BOOLEAN //
    localStorage.started = "false";
    localStorage.poolFinish = "false";
    localStorage.gameFinish = "false";

    // ARRAYS //
    localStorage.team = "";
    localStorage.resFinal = "";
    localStorage.listMatch = "";

    // SETTINGS //
    localStorage.randomTeam = "false";
    localStorage.elimination = "false";
    localStorage.win = "D";
    localStorage.loose = "0";
    localStorage.nbTables = "1";
    localStorage.nbCups = "6";
  },
  beforeUnmount() {
    const home = document.querySelector(".home");
    home.className = "home animate__animated animate__bounceOut";
  },
};
</script>

<style scoped>
@import url("../../node_modules/magic.css/dist/magic.min.css");
.magictime {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}

/* LOGO */
.home {
  position: relative;
  display: flex;
  justify-content: center;
  top: 30vh;
  border: solid 10px white;
  border-radius: 100rem;
  width: 15rem;
  height: 15rem;
  margin: auto;
  box-shadow: 8px 8px 8px 10px rgba(0, 0, 0, 0.1);
}

.nav-home-img {
  transform: scale(0.5) !important;
}

/* ID */
/* .code {
  width: 95%;
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: white;
  bottom: 2rem;
  margin: auto;
} */
</style>
