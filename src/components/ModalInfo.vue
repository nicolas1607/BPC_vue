<template>
  <div
    id="modal-info"
    class="overlap animate__fadeIn animate__delay-0.5s"
    hidden
  >
    <div
      id="modal"
      class="alert danger animate__animated animate__zoomIn animate__delay-0.5s"
    >
      <div class="alert-title">
        <h2 id="modal-info-title">{{ this.title }}</h2>
        <p id="modal-info-text">{{ this.text }}</p>
      </div>
      <div class="alert-btn">
        <button class="alert-cancel" @click="closeModalAlert()">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInfo",
  props: {
    title: String,
    text: String,
  },
  methods: {
    closeModalAlert() {
      const modal = document.querySelector("#modal-info");
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

#modal-info-text {
  color: white;
  font-size: 1rem;
  padding: 2rem 0;
}

#modal {
  background-color: var(--primary-color);
  position: absolute;
  top: auto;
  bottom: auto;
  left: 8%;
  width: 84%;
  padding: 2rem 2rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.alert-cancel {
  width: 100%;
}
</style>
