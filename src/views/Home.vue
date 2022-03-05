<template>
  <div>
    <div class="content">
      <router-link
        class="home animate__animated animate__rotateIn"
        style="--animate-duration: 2s"
        to="choices"
      >
        <img class="nav-home-img" :src="require(`../assets/logo.png`)" />
      </router-link>
    </div>
    <!-- <div class="code">
      <label for="code">ID</label>
      <input type="text" name="code" class="form-control" />
    </div> -->
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
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
    localStorage.win = "D";
    localStorage.equal = "1";
    localStorage.loose = "0";
    localStorage.randomTeam = "false";
  },
  beforeUnmount() {
    this.newGame();
    setTimeout(() => {}, 5000);
  },
  methods: {
    newGame() {
      const img = document.querySelector(".content a");
      img.className = "home animate__animated animate__rotateOut";
      img.style.display = "none";
      img.style.display = "block";
    },
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
