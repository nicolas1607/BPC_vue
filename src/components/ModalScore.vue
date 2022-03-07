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
        <div class="div-team">
          <!-- Team n°1 -->
          <div id="team1" class="team">
            <div id="sub-div">
              <span id="team-name1">{{ this.$parent.play1 }}</span>
            </div>
            <div id="sub-div-score">
              <div id="team-score-div">
                <input
                  id="team-score-valeur1"
                  class="team-score-valeur"
                  type="number"
                  pattern="[0-9]"
                  maxlength="1"
                  placeholder="0"
                />
                <p>pts</p>
              </div>
              <div class="change-score-div">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="lessPts(1)"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="addPts(1)"
                />
              </div>
            </div>
          </div>
          <!-- Team n°2 -->
          <div id="team2" class="team">
            <div id="sub-div">
              <span id="team-name2">{{ this.$parent.play2 }}</span>
            </div>
            <div id="sub-div-score">
              <div id="team-score-div">
                <input
                  id="team-score-valeur2"
                  class="team-score-valeur"
                  type="number"
                  pattern="[0-9]"
                  maxlength="1"
                  placeholder="0"
                />
                <p>pts</p>
              </div>
              <div class="change-score-div">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="lessPts(2)"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="addPts(2)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div-button-modal">
        <button
          v-if="this.$parent.nbTours + 1 < this.$parent.totalMatch"
          class="team-button"
          @click="setScore()"
        >
          Valider
        </button>
        <router-link v-else to="/score_table" class="team-button"
          >Valider</router-link
        >
      </div>
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
      play1: "",
      play2: "",
    };
  },
  mounted() {
    this.play1 = localStorage.play1;
    this.play2 = localStorage.play2;
    // OBJECTS
    if (localStorage.getItem("team")) {
      this.team = JSON.parse(localStorage.getItem("team"));
    }
    if (localStorage.getItem("listMatch")) {
      this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
    }
  },
  beforeUnmount() {
    if (this.$parent.nbTours + 1 == this.$parent.totalMatch) {
      this.setScore();
    }
  },
  methods: {
    addPts(id) {
      let max;
      if (localStorage.nbCups == "") max = 15;
      else max = localStorage.nbCups;
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value && valeur.value < max)
        valeur.value = parseInt(valeur.value) + 1;
      else valeur.value = 1;
      if (valeur.value == 0) valeur.value = null;
      // this.verifVictory();
    },
    lessPts(id) {
      let max;
      if (localStorage.nbCups == "") max = 15;
      else max = localStorage.nbCups;
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value && valeur.value > 0)
        valeur.value = parseInt(valeur.value) - 1;
      if (valeur.value == 0) valeur.value = max;
      // this.verifVictory();
    },
    // verifVictory() {
    //   const score1 = document.querySelector("#team-score-valeur1");
    //   const score2 = document.querySelector("#team-score-valeur2");
    //   const button = document.querySelector(".team-button");
    //   if (
    //     (score1.value > 0 && score2.value == 0) ||
    //     (score1.value == 0 && score2.value > 0)
    //   ) {
    //     button.className = "team-button";
    //     button.disabled = false;
    //   } else button.disabled = true;
    // },
    setScore() {
      const team1 = document.querySelector("#team-name1").innerHTML;
      let score1 = document.querySelector("#team-score-valeur1").value;
      document.querySelector("#team-score-valeur1").value = "0";
      const team2 = document.querySelector("#team-name2").innerHTML;
      let score2 = document.querySelector("#team-score-valeur2").value;
      document.querySelector("#team-score-valeur2").value = "0";

      // Augmente le nbTours
      if (this.$parent.nbTours < this.$parent.totalMatch - 1) {
        this.$parent.nbTours++;
        localStorage.nbTours++;
      }

      // Supprimer le match de listMatch
      const matchs = [];
      for (let match of this.$parent.listMatch) {
        if (
          this.$parent.getTeamName(match[0]) == team1 &&
          this.$parent.getTeamName(match[1]) == team2
        ) {
          // empty
        } else {
          matchs.push([match[0], match[1]]);
        }
      }
      localStorage.setItem("listMatch", JSON.stringify(matchs));
      localStorage.setItem("listMatch", JSON.stringify(matchs));
      if (localStorage.getItem("listMatch")) {
        this.$parent.listMatch = JSON.parse(localStorage.getItem("listMatch"));
      }

      // Maj du tableau des scores
      if (score1 == null || score1 == "") score1 = 0;
      if (score2 == null || score2 == "") score2 = 0;
      const result = [];
      for (let team of this.$parent.team) {
        if (team["value"][0] == team1) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score1),
            ],
          });
        } else if (team["value"][0] == team2) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score2),
            ],
          });
        } else {
          result.push({
            name: team["name"],
            value: [team["value"][0], team["value"][1], team["value"][2]],
          });
        }
      }

      localStorage.setItem("team", JSON.stringify(result));
      if (localStorage.getItem("team")) {
        this.$parent.team = JSON.parse(localStorage.getItem("team"));
      }
      this.$parent.closeScoreModal();
    },
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
  width: 84%;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 2rem;
}

.modal-edit {
  top: 10%;
  bottom: 10%;
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
#div-img-modal {
  display: flex;
  justify-content: space-around;
}

#title-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

#title-score img {
  width: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

@media screen and (min-width: 36em) {
  #title-score {
    align-items: unset;
    flex-direction: row;
  }
}

.div-team {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  text-align: center;
}

#sub-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

#sub-div-score {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.team-name {
  word-break: break-word;
}

#team-score-div {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.team-score-valeur {
  text-align: right;
  width: 3rem;
  height: 2rem;
  background-color: var(--primary-color);
  border: none;
  color: white;
  font-size: 1.8rem;
}

.team-score-valeur::placeholder {
  color: white;
}

.change-score-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
}

.change-score {
  cursor: pointer;
  width: 40%;
  margin-top: 0.5rem;
  opacity: 0.6;
}

.change-score:hover {
  opacity: 1;
}

.div-button-modal {
  display: flex;
  justify-content: center;
}

.team-button {
  margin: auto;
  padding: 0.8rem 1rem;
  width: 70%;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.2rem;
  color: #bbb4b5;
  z-index: 1;
  outline: none;
  border: none;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  background-color: white;
  opacity: 0.8;
  text-align: center;
}

.team-button[disabled] {
  background-color: white;
  opacity: 0.4;
}

.disabled {
  pointer-events: none;
}

/* MODAL EDIT */
#match-edit {
  color: white;
  margin-top: 4rem;
  margin-bottom: 6rem;
  padding: 0 2rem;
}

@media screen and (min-width: 36em) {
  #match-edit {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem 4rem;
    padding: 0;
  }
}

.match-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: 2rem;
  border: solid 1px white;
  padding: 0rem 1rem;
  font-size: 1.4rem;
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

#match-edit-title {
  margin-top: 4rem;
  text-align: center;
}
</style>