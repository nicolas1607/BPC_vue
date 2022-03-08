<template>
  <div
    id="modal-score"
    class="overlap animate__fadeIn animate__delay-0.5s"
    hidden
  >
    <div
      id="modal"
      class="modal-score animate__animated animate__zoomIn animate__delay-0.5s"
    >
      <a id="close-modal" @click="this.$parent.closeScoreModal()">
        <font-awesome-icon :icon="['fa', 'times']" class="font-awesome-icon" />
      </a>
      <div id="div-img-modal">
        <!-- <h2 v-if=""></h2> -->
        <div id="div-players">
          <div>
            <div class="score-input">
              <p class="score1">0</p>
            </div>
            <p id="team-name1" class="animate__animated animate__bounceIn">
              {{ this.$parent.play1 }}
            </p>
          </div>
          <div>
            <div class="score-input">
              <p class="score2">0</p>
            </div>
            <p id="team-name2" class="animate__animated animate__bounceIn">
              {{ this.$parent.play2 }}
            </p>
          </div>
        </div>
      </div>
      <button
        v-if="this.$parent.nbTours + 1 < this.$parent.totalMatch"
        class="team-button"
        @click="this.$parent.setScore()"
      >
        Valider
      </button>
      <router-link v-else to="/score_table" class="team-button"
        >Valider</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalScore",
  data() {
    return {
      listMatch: {},
      team: {},
    };
  },
  mounted() {
    // OBJECTS
    if (localStorage.getItem("team")) {
      this.team = JSON.parse(localStorage.getItem("team"));
    }
    if (localStorage.getItem("listMatch")) {
      this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
    }
  },
};
</script>

<style>
.overlap {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: scroll;
}

.overlap[hidden] {
  display: none;
}

#modal {
  overflow: scroll;
  background-color: var(--primary-color);
  position: absolute;
  left: 8%;
  top: auto;
  bottom: auto;
  max-height: 80%;
  width: 84%;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 2rem;
}

#close-modal {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.5rem;
  color: white;
  opacity: 0.4;
  font-size: 1.2rem;
}

#close-modal:hover {
  transform: scale(1.2);
  opacity: 1;
}

/* Fenêtre modale Score */
#div-players {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  color: white;
}

#div-versus-btn {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 10%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

#team-name1,
#team-name2 {
  word-break: break-word;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 0;
}

#player1 {
  --animate-duration: 2s;
}
#player2 {
  --animate-duration: 3s;
}

.team-button {
  width: 100%;
  margin-top: 2rem;
}

/* MODAL EDIT */
#match-edit {
  color: white;
  margin-top: 4rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

#match-edit-title {
  margin-top: 3rem;
  text-align: center;
  font-size: 1.2rem;
}

.match-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: 2rem;
  border: solid 1px white;
  padding: 0.4rem 1rem;
  font-size: 1rem;
}

.match-edit p {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.match-edit:hover {
  animation: jelly 0.5s;
}

.match-edit-vs {
  width: 20%;
  margin: 0 1rem;
  /* margin-top: -.5rem; */
}
</style>