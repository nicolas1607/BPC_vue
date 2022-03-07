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
        <a id="close-modal" @click="closeEditModal()">X</a>
        <h2 id="match-edit-title">
          Séléctionner <br />
          votre match
        </h2>
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
        <div class="div-table">
          <table class="table table-striped table-hover sortable">
            <thead>
              <tr>
                <th>#</th>
                <th>Équipe</th>
                <th>Joueurs</th>
                <th id="score-sortable">Score</th>
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
                <td v-if="team.value[2]" id="score-sortable">
                  {{ team.value[2] }}
                </td>
                <td v-else id="score-sortable">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <a
          class="
            edit-match
            animate__animated animate__bounceIn animate__delay-2s
          "
          @click="showEditModal()"
        >
          <img id="edit-match" :src="require(`../assets/editer.png`)" />
        </a>
        <a
          class="
            switch-match
            animate__animated animate__bounceIn animate__delay-1s
          "
          @click="randomMatch()"
        >
          <font-awesome-icon
            :icon="['fa', 'random']"
            id="switch-match"
            class="font-awesome-icon"
          />
        </a>
        <a class="game-match animate__animated animate__bounceIn">
          <font-awesome-icon
            :icon="['fa', 'dice']"
            id="game-match"
            class="font-awesome-icon"
          />
        </a>
        <a class="toggle-match">
          <font-awesome-icon
            :icon="['fa', 'ellipsis-h']"
            class="btn-toggle font-awesome-icon"
            @click="displayBtn()"
          />
        </a>

        <div id="div-versus">
          <div id="div-players">
            <div>
              <input
                class="team-score-valeur"
                type="number"
                aria-label="Score du joueur n°1"
                pattern="[0-9]"
                placeholder="0"
              />
              <p id="player1" class="animate__animated animate__bounceIn">
                {{ play1 }}
              </p>
            </div>
            <img
              id="team-versus"
              class="animate__animated animate__jackInTheBox animate__delay-1s"
              :src="require(`../assets/vs.svg`)"
            />
            <div>
              <input
                class="team-score-valeur"
                type="number"
                aria-label="Score du joueur n°1"
                pattern="[0-9]"
                placeholder="0"
              />
              <p id="player2" class="animate__animated animate__bounceIn">
                {{ play2 }}
              </p>
            </div>
          </div>
          <button class="button-img" @click="showScoreModal()">
            Jouer le match
          </button>
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
  methods: {
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
        return a["value"][2] > b["value"][2] ? -1 : 1;
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
      modal.hidden = false;
    },
    closeScoreModal() {
      const modal = document.querySelector("#modal-score");
      modal.hidden = true;
    },
  },
};
</script>

<style scoped>
#div-versus {
  position: relative;
  text-align: center;
  color: white;
  margin-top: 6rem;
  margin-bottom: 4rem;
}

#div-players {
  display: grid;
  grid-template-columns: 3fr 1.5fr 3fr;
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
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 80%;
}

.div-table {
  display: flex;
  flex-direction: column;
}

#player1,
#player2 {
  word-break: break-word;
  font-size: 1rem;
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
  margin-top: 3rem;
  animation: unset;
}

.team-score-valeur {
  background-color: transparent;
  text-align: center;
  width: 3rem;
  height: 2rem;
  border: none;
  color: white;
  font-size: 2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.team-score-valeur::placeholder {
  color: white;
}

/* TOGGLE BTN */

.edit-match,
.switch-match,
.game-match {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1.5rem;
  border-radius: 10rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  width: 3rem;
  height: 3rem;
  background-color: var(--primary-color);
  z-index: 10;
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
  transform: rotate(0);
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