@<template>
  <div>
    <Header
      title="Phase de Pool"
      :nbTours="this.nbTours"
      :totalMatch="this.totalMatch"
    />

    <div id="menu">
      <div class="nav-title">
        <font-awesome-icon
          :icon="['fa', 'bars']"
          style="margin-left: 0; margin-right: 1rem"
          class="font-awesome-icon"
          @click="this.hiddenMenu()"
        />
        <img class="nav-img" :src="require(`../assets/logo.png`)" />
      </div>
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/" class="menu-link">Nouvelle partie</router-link>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Tableau des scores</a>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Changer les équipes</a>
        </li>
      </ul>
    </div>

    <ModalScore />

    <div id="modal-edit" class="overlap" hidden>
      <div id="modal" class="modal-edit">
        <a id="close-modal" @click="closeEditModal()"
          ><font-awesome-icon :icon="['fa', 'times']" class="font-awesome-icon"
        /></a>
        <h2 id="match-edit-title">Séléctionner votre match</h2>
        <div id="match-edit">
          <div v-for="match in this.listMatch" :key="match">
            <a
              v-if="
                getTeamName(match[0]) != this.play1 ||
                getTeamName(match[1]) != this.play2
              "
              @click="changeMatch(match[0] + '-' + match[1])"
              class="match-edit"
            >
              <p>{{ getTeamName(match[0]) }}</p>
              <p>{{ getTeamName(match[1]) }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="table-team">
        <!-- Match en cours -->
        <div id="div-versus">
          <img
            id="team-versus"
            class="animate__animated animate__jackInTheBox animate__delay-1s"
            :src="require(`../assets/vs.svg`)"
          />
          <div id="div-players">
            <!-- Team n°1 -->
            <div>
              <div class="score-input">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="this.lessPts(1)"
                />
                <input
                  id="team-score-valeur1"
                  class="team-score-valeur"
                  type="number"
                  aria-label="Score du joueur n°1"
                  pattern="[0-9]"
                  placeholder="0"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="this.addPts(1)"
                />
              </div>
              <p id="player1" class="animate__animated animate__bounceIn">
                {{ play1 }}
              </p>
            </div>
            <!-- Team n°2 -->
            <div>
              <div class="score-input">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="this.lessPts(2)"
                />
                <input
                  id="team-score-valeur2"
                  class="team-score-valeur"
                  type="number"
                  aria-label="Score du joueur n°1"
                  pattern="[0-9]"
                  placeholder="0"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="this.addPts(2)"
                />
              </div>
              <p id="player2" class="animate__animated animate__bounceIn">
                {{ play2 }}
              </p>
            </div>
          </div>
          <button class="button-img" @click="showScoreModal()">
            Jouer le match
          </button>
        </div>

        <!-- Nav tabs -->
        <ul class="tabs">
          <li class="tabs-item tabs-active">
            <a class="tabs-link" aria-current="page" href="#"
              >Tableau des scores</a
            >
          </li>
          <li class="tabs-item">
            <a class="tabs-link" href="#">Liste des matchs</a>
          </li>
        </ul>

        <!-- Tableau des scores -->
        <div class="div-table">
          <table class="table table-striped table-hover sortable">
            <thead>
              <tr>
                <th>#</th>
                <th>Équipe</th>
                <th>Joueurs</th>
                <th>V</th>
                <th>D</th>
                <th id="score-sortable">P</th>
              </tr>
            </thead>
            <tbody v-for="team in team" :key="team">
              <tr id="1" class="tr-elem">
                <td class="team-num">{{ team.name }}</td>
                <td>{{ team.value[0] }}</td>
                <td class="table-players" v-if="team.value[1].length != 0">
                  <span v-for="(player, index) in team.value[1]" :key="player">
                    <p v-if="index < team.value[1].length - 1">{{ player }},</p>
                    <p v-else>{{ player }}</p>
                  </span>
                </td>
                <td v-else>/</td>
                <td v-if="team.value[3]" id="score-sortable">
                  {{ team.value[3] }}
                </td>
                <td v-else id="score-sortable">0</td>
                <td v-if="team.value[4]">{{ team.value[4] }}</td>
                <td v-else>0</td>
                <td v-if="team.value[2]">
                  {{ team.value[2] }}
                </td>
                <td v-else>0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Toggle boutons -->
        <div>
          <a class="edit-match" @click="showEditModal()">
            <font-awesome-icon
              :icon="['fa', 'pen']"
              id="edit-match"
              class="font-awesome-icon"
            />
          </a>
          <a class="switch-match animate__animated" @click="randomMatch()">
            <font-awesome-icon
              :icon="['fa', 'random']"
              id="switch-match"
              class="font-awesome-icon"
            />
          </a>
          <a class="game-match">
            <font-awesome-icon
              :icon="['fa', 'dice']"
              id="game-match"
              class="font-awesome-icon"
            />
          </a>
          <a class="toggle-match" @click="displayBtn()">
            <font-awesome-icon
              :icon="['fa', 'ellipsis-h']"
              class="btn-toggle font-awesome-icon"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import ModalScore from "@/components/ModalScore.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    ModalScore,
    Footer,
  },
  data() {
    return {
      // INTEGER //
      nbTours: 0,
      totalMatch: 0,
      // STRING //
      play1: "",
      play2: "",
      // OBJECTS PROXY //
      team: {},
      listMatch: {},
    };
  },
  created() {
    // touche 'Echap'
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const editModal = document.querySelector("#modal-edit");
        const scoreModal = document.querySelector("#modal-score");
        if (editModal.hidden == false) editModal.hidden = true;
        if (scoreModal.hidden == false) scoreModal.hidden = true;
      }
    });
  },
  mounted() {
    // INTEGER //
    this.nbTours = localStorage.nbTours;
    this.totalMatch = localStorage.totalMatch;

    // OBJECTS
    this.team = JSON.parse(localStorage.getItem("team"));
    this.listMatch = JSON.parse(localStorage.getItem("listMatch"));

    // JS_SORTABLE
    let sortableScript = document.createElement("link");
    sortableScript.setAttribute("href", "../assets/js/sorttable.js");
    document.head.appendChild(sortableScript);
  },
  updated() {
    // Increment nbTours / totalMatch
    if (this.listMatch[0]) {
      for (let team of this.team) {
        if (team["name"] == this.listMatch[0][0]) {
          this.play1 = team["value"][0];
          localStorage.play1 = team["value"][0];
        }
        if (team["name"] == this.listMatch[0][1]) {
          this.play2 = team["value"][0];
          localStorage.play2 = team["value"][0];
        }
      }
    }
    this.sortedData();
  },
  beforeUnmount() {
    if (this.nbTours + 1 == this.totalMatch) {
      this.setScore();
    }
  },
  methods: {
    addPts(id) {
      let max;
      if (localStorage.nbCups == "") max = 15;
      else max = localStorage.nbCups;
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value && valeur.value < max) {
        valeur.value = parseInt(valeur.value) + 1;
      } else {
        valeur.value = 1;
      }
      if (valeur.value == 0) valeur.value = null;
    },
    lessPts(id) {
      let max;
      if (localStorage.nbCups == "") max = 15;
      else max = localStorage.nbCups;
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value && valeur.value > 0) {
        valeur.value = parseInt(valeur.value) - 1;
      }
      if (valeur.value == 0) {
        valeur.value = max;
      }
    },
    hiddenMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeOutLeft";
      menu.style.display = "none";
      menu.style.display = "block";
    },
    getTeamName(id) {
      let res;
      for (let team of this.team) {
        if (team["name"] == id) {
          res = team["value"][0];
        }
      }
      return res;
    },
    displayBtn() {
      const toggle = document.querySelector(".btn-toggle");
      const editMatch = document.querySelector(".edit-match");
      const switchMatch = document.querySelector(".switch-match");
      const gameMatch = document.querySelector(".game-match");
      if (editMatch.className.includes("bounceIn")) {
        editMatch.className = "edit-match animate__animated animate__bounceOut";
        switchMatch.className =
          "switch-match animate__animated animate__bounceOut animate__delay-1s";
        gameMatch.className =
          "game-match animate__animated animate__bounceOut animate__delay-2s";
        toggle.setAttribute("style", "transform: rotate(-270deg)");
      } else {
        editMatch.className =
          "edit-match animate__animated animate__bounceIn animate__delay-2s";
        switchMatch.className =
          "switch-match animate__animated animate__bounceIn animate__delay-1s";
        gameMatch.className = "game-match animate__animated animate__bounceIn";
        toggle.setAttribute("style", "transform: rotate(0)");
        editMatch.style.display = "flex";
        switchMatch.style.display = "flex";
        gameMatch.style.display = "flex";
      }
    },
    randomMatch(p1, p2) {
      if (this.listMatch[1]) {
        let match = [];
        for (let team of this.listMatch) {
          match.push([team[0], team[1]]);
        }
        // edit button match
        if (p1 && p2) {
          let flag = false;
          while (flag == false) {
            if (match[0][0] == p1 && match[0][1] == p2) {
              flag = true;
            } else {
              match.sort(() => Math.random() - 0.5);
            }
          }
        }
        // random button match
        else {
          while (
            this.listMatch[0][0] == match[0][0] &&
            this.listMatch[0][1] == match[0][1]
          ) {
            match.sort(() => Math.random() - 0.5);
          }
        }
        let parsed = JSON.stringify(match);
        localStorage.setItem("listMatch", parsed);
        localStorage.setItem("listMatch", JSON.stringify(match));
        if (localStorage.getItem("listMatch")) {
          this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
        }
      }
    },
    sortedData() {
      this.team.sort(function (a, b) {
        if (a["value"][3] > b["value"][3]) {
          return -1;
        } else if (a["value"][3] < b["value"][3]) {
          return 1;
        } else {
          if (a["value"][2] < b["value"][2]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      const teamNum = document.querySelectorAll(".team-num");
      for (let i = 0; i < teamNum.length; i++) {
        teamNum[i].innerHTML = i + 1;
      }
    },
    changeMatch(team) {
      const p1 = team.split("-")[0];
      const p2 = team.split("-")[1];
      this.randomMatch(p1, p2);
      this.closeEditModal();
    },
    // EDIT MODAL
    showEditModal() {
      const modal = document.querySelector("#modal-edit");
      modal.hidden = false;
    },
    closeEditModal() {
      const modal = document.querySelector("#modal-edit");
      modal.hidden = true;
    },
    // SCORE MODAL
    showScoreModal() {
      const modal = document.querySelector("#modal-score");
      const score1 = document.querySelector("#team-score-valeur1").value;
      const score2 = document.querySelector("#team-score-valeur2").value;
      if (score1 == "") document.querySelector(".score1").innerHTML = 0;
      else document.querySelector(".score1").innerHTML = score1;
      if (score2 == "") document.querySelector(".score2").innerHTML = 0;
      else document.querySelector(".score2").innerHTML = score2;
      modal.hidden = false;
    },
    closeScoreModal() {
      const modal = document.querySelector("#modal-score");
      modal.hidden = true;
    },
    // SET SCORE
    setScore() {
      const team1 = document.querySelector("#team-name1").innerHTML;
      let score1 = document.querySelector("#team-score-valeur1").value;
      document.querySelector("#team-score-valeur1").value = "0";
      document.querySelector(".score1").innerHTML = "0";
      const team2 = document.querySelector("#team-name2").innerHTML;
      let score2 = document.querySelector("#team-score-valeur2").value;
      document.querySelector("#team-score-valeur2").value = "0";
      document.querySelector(".score2").innerHTML = "0";

      // Augmente le nbTours
      if (this.nbTours < this.totalMatch - 1) {
        this.nbTours++;
        localStorage.nbTours++;
      }

      // Supprimer le match de listMatch
      const matchs = [];
      for (let match of this.listMatch) {
        if (
          this.getTeamName(match[0]) == team1 &&
          this.getTeamName(match[1]) == team2
        ) {
          // empty
        } else {
          matchs.push([match[0], match[1]]);
        }
      }
      localStorage.setItem("listMatch", JSON.stringify(matchs));
      localStorage.setItem("listMatch", JSON.stringify(matchs));
      if (localStorage.getItem("listMatch")) {
        this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
      }

      // Maj du tableau des scores
      // if (score1 == null || score1 == "") score1 = 0;
      // if (score2 == null || score2 == "") score2 = 0;
      const result = [];
      for (let team of this.team) {
        if (team["value"][0] == team1) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score1),
              parseInt(score1) > parseInt(score2)
                ? team["value"][3] + 1
                : team["value"][3],
              parseInt(score1) < parseInt(score2)
                ? team["value"][4] + 1
                : team["value"][4],
            ],
          });
        } else if (team["value"][0] == team2) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score2),
              parseInt(score1) < parseInt(score2)
                ? team["value"][3] + 1
                : team["value"][3],
              parseInt(score1) > parseInt(score2)
                ? team["value"][4] + 1
                : team["value"][4],
            ],
          });
        } else {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              team["value"][2],
              team["value"][3],
              team["value"][4],
            ],
          });
        }
      }
      localStorage.setItem("team", JSON.stringify(result));
      if (localStorage.getItem("team")) {
        this.team = JSON.parse(localStorage.getItem("team"));
      }
      this.closeScoreModal();
    },
  },
};
</script>

<style scoped>
#div-versus {
  position: relative;
  text-align: center;
  color: white;
  margin-top: 7rem;
  margin-bottom: 4rem;
  background-color: rgba(239, 71, 111, 0.1);
  border: solid 3px white;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
}

#div-players {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

#team-versus {
  position: absolute;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 20%;
  top: -2rem;
  right: -1rem;
}

#player1,
#player2 {
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

.button-img {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
  animation: unset;
}

.team-score-valeur {
  background-color: transparent;
  text-align: center;
  width: 3.6rem;
  height: 3rem;
  border: none;
  color: white;
  font-size: 2.4rem;
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;
  padding: 0;
}

.team-score-valeur::placeholder {
  color: white;
}

.score-input {
  display: flex;
  justify-content: center;
  align-content: center;
}

.score-input img {
  width: 15%;
}

.div-table {
  padding-bottom: 10rem;
}

/* NAV TABS */

.tabs {
  transform: none;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.tabs-item {
  font-size: 1rem;
  padding: 0 0.5rem 1rem 0.5rem;
  text-align: center;
  color: white;
}

.tabs-active {
  border-bottom: solid 2px white;
}

/* TOGGLE BTN */

.edit-match,
.switch-match,
.game-match {
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  right: 1.5rem;
  border-radius: 10rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  width: 3rem;
  height: 3rem;
  background-color: var(--primary-color);
  z-index: 10;
  font-size: 1.2rem;
}

.edit-match {
  bottom: 18rem;
}

.switch-match {
  bottom: 14rem;
}

.game-match {
  bottom: 10rem;
}

.btn-toggle {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 6rem;
  color: white;
  right: 1.5rem;
  font-size: 1.2rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-color);
  border-radius: 10rem;
  height: 3rem;
  width: 3rem;
  padding: 0.8rem;
  z-index: 10;
  transform: scale(1.1);
  transform: rotate(-270deg);
  transition: transform 2s;
}

#edit-match,
#switch-match,
#game-match {
  width: 100%;
}

#edit-match {
  --animate-duration: 1s;
}

#switch-match {
  --animate-duration: 1.5s;
}

#game-match {
  --animate-duration: 2s;
}
</style>