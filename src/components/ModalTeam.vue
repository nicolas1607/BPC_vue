<template>
  <div
    id="modal-team"
    class="overlap animate__fadeIn animate__delay-0.5s"
    hidden
  >
    <div
      id="modal"
      class="alert danger animate__animated animate__zoomIn animate__delay-0.5s"
    >
      <div class="alert-title">
        <h2 id="modal-info-title">Liste des équipes</h2>
      </div>
      <div class="alert-teams"></div>
      <div class="alert-btn">
        <router-link to="/game" class="team-button">Commencer</router-link>
        <button class="alert-cancel" @click="closeModalAlert()">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalTeam",
  props: {
    title: String,
    text: String,
  },
  methods: {
    closeModalAlert() {
      const modal = document.querySelector("#modal-team");
      modal.hidden = true;
    },
  },
};
</script>

<style scoped>
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

#modal-info-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2rem;
}

.alert-teams {
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: white;
  font-size: 1rem;
  margin-top: 2rem;
}

#modal {
  background-color: var(--primary-color);
  position: absolute;
  top: auto;
  bottom: auto;
  left: 5%;
  width: 90%;
  padding: 2rem 2rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.alert-btn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.alert-cancel {
  margin-top: 2rem;
}

.team-button {
  background-color: #efefef;
}
</style>
