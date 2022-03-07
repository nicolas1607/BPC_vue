<template>
  <div class="checkboxes">
    <!-- Paramètres du mode -->
    <div class="param-mode animate__animated animate__bounceInLeft">
      <h2>Paramètres du mode</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem">
        <div class="form-check form-switch checkbox">
          <label for="return">EcE</label>
          <input
            id="teamVteam"
            class="form-check-input"
            type="checkbox"
            name="return"
            @click="teamVteam()"
            checked
          />
        </div>
        <div class="form-check form-switch checkbox">
          <label for="return">JcJ</label>
          <input
            id="playerVplayer"
            class="form-check-input"
            type="checkbox"
            name="return"
            @click="playerVplayer()"
          />
        </div>
      </div>
      <div class="form-check form-switch checkbox">
        <label for="return"
          >Équipes aléatoires
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Équipes aléatoires : laissez faire la chance !',
                'Renseigner le nom des joueurs pour générer aléatoirement les équipes'
              )
            "
          />
        </label>
        <input
          class="form-check-input check-random"
          type="checkbox"
          name="return"
        />
      </div>
      <div class="form-check form-switch checkbox check-elim-series">
        <label for="return"
          >Série d'élimination
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Série d\'élimination : il n\'en restera qu\'un !',
                'Uniquement en mode Tournoi <br><br> Séléctionner les 4, 8 ou 16 meilleurs équipes en fin de Pool pour vous affronter sur une série d\'élimination'
              )
            "
          />
        </label>
        <input
          class="form-check-input check-elimination"
          type="checkbox"
          name="return"
        />
      </div>
      <!-- <div class="checkbox">
        <input type="checkbox" name="return" />
        <label for="return">Activer la double élimination</label>
      </div> -->
      <!-- <div class="checkbox">
        <input type="checkbox" name="return" />
        <label for="return">Activer les matchs retour</label>
      </div> -->
    </div>
    <!-- Options avancées -->
    <div
      class="
        param-advanced
        animate__animated animate__bounceInLeft animate__delay-1s
      "
    >
      <h2>Options avancées</h2>
      <div class="nb-pts-select">
        <label for="win"
          >Nb de points par victoire
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Nb de points par victoire',
                'D : différence de verre entre le gagnant et le perdant <br> 1 à 5 : nombre de points attribués au gagnant'
              )
            "
          />
        </label>
        <select id="win" class="nb-pts" name="win">
          <option value="D" selected>D</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="nb-pts-select">
        <label for="loose">Nb de points par défaite</label>
        <select id="loose" class="nb-pts" name="loose">
          <option value="-2">-2</option>
          <option value="-1">-1</option>
          <option value="0" selected>0</option>
          <option value="1">1</option>
        </select>
      </div>
      <hr />
      <div class="nb-pts-select">
        <label for="table"
          >Nombre de tables
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Nombre de tables',
                'Choisir le nombre de table disponible pour jouer plusieurs matchs en même temps'
              )
            "
          />
        </label>
        <select id="nbTables" class="nb-pts" name="table">
          <option value="1" selected>1</option>
          <option value="3">2</option>
          <option value="5">3</option>
          <option value="5">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <!-- <div class="nb-pts-select">
        <label for="table"
          >Nombre d'équipes
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Nombre d\équipes',
                'Uniquement en mode Élimination <br><br> 4 équipes : 2 rounds (3 matchs) <br> 8 équipes : 3 rounds (7 matchs) <br> 16 équipes : 4 rounds (15 matchs) <br> 32 équipes : 5 rounds (31 matchs)'
              )
            "
          />
        </label>
        <select id="nbTeams" class="nb-pts" name="table" disabled>
          <option value="" selected></option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div> -->
      <div class="nb-pts-select">
        <label for="table"
          >Nombre de verres par équipe
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="
              this.$parent.openModalInfo(
                'Nombre de verres par équipe',
                'Uniquement disponible avec le nombre de points par victoire défini sur \'D\''
              )
            "
          />
        </label>
        <select id="nbCups" class="nb-pts" name="table">
          <option value="" selected></option>
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamTournament",
  beforeUnmount() {
    localStorage.win = document.querySelector("#win").value;
    localStorage.loose = document.querySelector("#loose").value;
    localStorage.nbTables = document.querySelector("#nbTables").value;
    localStorage.nbCups = document.querySelector("#nbCups").value;
  },
  methods: {
    teamVteam() {
      const team = document.querySelector("#teamVteam");
      const player = document.querySelector("#playerVplayer");
      const random = document.querySelector(".check-random");
      if (team.checked) {
        if (player.checked) {
          player.checked = false;
          random.disabled = false;
        } else {
          player.checked = true;
          random.disabled = true;
        }
      } else {
        if (player.checked) {
          player.checked = false;
          random.disabled = false;
        } else {
          player.checked = true;
          random.disabled = true;
        }
      }
    },
    playerVplayer() {
      // Gestion checkboxes
      const team = document.querySelector("#teamVteam");
      const player = document.querySelector("#playerVplayer");
      const random = document.querySelector(".check-random");
      if (player.checked) {
        if (team.checked) {
          team.checked = false;
          random.disabled = true;
        } else {
          team.checked = true;
          random.disabled = false;
        }
      } else {
        if (team.checked) {
          team.checked = false;
          random.disabled = true;
        } else {
          team.checked = true;
          random.disabled = false;
        }
      }
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 2rem;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin-bottom: 1rem;
}

hr {
  position: relative;
  top: 0;
  left: 0;
  width: 70%;
}

.checkboxes {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 1rem;
}

.checkboxes label {
  font-size: 1rem;
}

.nb-pts-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nb-pts {
  width: 3rem;
  background-color: transparent;
  color: white;
  border: transparent;
}
</style>
