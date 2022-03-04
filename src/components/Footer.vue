<template>
  <!-- ALERT DANGER -->
  <ModalAlert title="Êtes vous sûr de vouloir quitter la partie en cours ?" />

  <div class="footer-menu">
    <a class="footer-trophy">
      <font-awesome-icon :icon="['fa', 'trophy']" class="font-awesome-icon" />
      <p class="footer-text">Trophées</p>
    </a>
    <a class="footer footer-home" @click="openModalAlert()">
      <font-awesome-icon :icon="['fa', 'home']" class="font-awesome-icon" />
      <p class="footer-text">Accueil</p>
    </a>
    <router-link class="footer-setting" to="/settings">
      <font-awesome-icon :icon="['fa', 'cogs']" class="font-awesome-icon" />
      <p class="footer-text">Paramètres</p>
    </router-link>
  </div>
</template>

<script>
import ModalAlert from "@/components/ModalAlert.vue";

export default {
  name: "Footer",
  components: {
    ModalAlert,
  },
  methods: {
    openModalAlert() {
      const modal = document.querySelector("#modal-danger");
      modal.hidden = false;
    },
  },
};
</script>

<style scoped>
.footer-menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: fixed;
  max-width: 100vw;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--primary-color);
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}

.footer-menu a {
  margin: auto;
  padding: 0.8rem 1rem 0.4rem 1rem;
}

.footer-trophy,
.footer-home,
.footer-setting {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-text {
  font-size: 0.7rem;
  padding-top: 0.4rem;
}
</style>
