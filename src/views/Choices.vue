<template>
  <div>
    <ModalInfo />
    <ModalTeam />

    <div class="go animate__animated animate__bounceIn animate__delay-1s">
      <a @click="openModalTeam()">
        <font-awesome-icon :icon="['fa', 'play']" class="font-awesome-icon" />
      </a>
    </div>
    <a
      @click="addTeam()"
      class="
        add-team-button
        animate__animated animate__bounceIn animate__delay-2s
      "
    >
      <font-awesome-icon :icon="['fa', 'plus']" class="font-awesome-icon" />
    </a>
    <font-awesome-icon
      :icon="['fa', 'ellipsis-h']"
      class="btn-toggle font-awesome-icon"
      @click="displayBtn()"
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
          <a href="" class="menu-link">Tableau des scores</a>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Changer les équipes</a>
        </li>
      </ul>
    </div>

    <div class="container">
      <div id="param-header">
        <div id="mode-param">
          <div id="mode">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <label for="mode"
                >Mode de jeu
                <font-awesome-icon
                  :icon="['fa', 'info-circle']"
                  style="margin-left: 0; margin-right: 1rem; width: 1rem"
                  class="font-awesome-icon"
                  @click="
                    openModalInfo(
                      'Mode de jeu',
                      'Tournoi : toutes les équipes se rencontrent au moins une fois <br><br> Élimination : si vous perdez un match, vous êtes éliminé de la partie <br> (se joue à 4, 8, 16 ou 32 équipes)'
                    )
                  "
                />
              </label>
              <font-awesome-icon
                :icon="['fa', 'ellipsis-h']"
                class="font-awesome-icon"
                @click="displayParam()"
              />
            </div>
            <select id="mode-select" class="form-select" name="mode">
              <option value="tournament">Tournoi</option>
              <!-- <option value="elimination">Élimination</option> -->
            </select>
          </div>
        </div>

        <div id="params">
          <component
            v-for="(component, index) in params"
            :key="index"
            :is="component"
          />
        </div>
      </div>

      <section>
        <div class="skewed-param"></div>
      </section>

      <div id="teams">
        <component
          v-for="(component, index) in teams"
          :key="index"
          :is="component"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import NewTeam from "@/components/NewTeam.vue";
import ParamTournament from "@/components/ParamTournament.vue";
import Footer from "@/components/Footer.vue";
import ModalInfo from "@/components/ModalInfo.vue";
import ModalTeam from "@/components/ModalTeam.vue";

export default {
  name: "Home",
  components: {
    Header,
    NewTeam,
    ParamTournament,
    Footer,
    ModalInfo,
    ModalTeam,
  },
  data() {
    return {
      teams: [],
      params: <ParamTournament />,
    };
  },
  created() {
    this.teams.push(<NewTeam id="1" />);
  },
  mounted() {
    const mode = document.querySelector("#mode-select");
    mode.addEventListener("change", () => {
      if (mode.value == "elimination") {
        document.querySelector(".check-elim-series input").disabled = true;
      } else {
        document
          .querySelector(".check-elim-series input")
          .removeAttribute("disabled");
      }
    });
  },
  beforeUnmount() {
    this.init();
  },
  methods: {
    openModalInfo(title, text) {
      document.querySelector("#modal-info-title").innerHTML = title;
      document.querySelector("#modal-info-text").innerHTML = text;
      document.querySelector("#modal-info").hidden = false;
    },
    openModalTeam() {
      // on réinitialise la liste
      const listTeam = document.querySelectorAll(".alert-team");
      listTeam.forEach((elem) => elem.remove());
      // on recrée la liste
      const div = document.querySelector(".alert-teams");
      const teams = document.querySelectorAll(".team-name-input");
      for (let i = 0; i < teams.length; i++) {
        let p = document.createElement("p");
        p.className = "alert-team";
        if (teams[i].value != "") p.innerHTML = teams[i].value;
        else p.innerHTML = "Équipe n°" + (i + 1);
        div.appendChild(p);
      }
      document.querySelector("#modal-team").hidden = false;
    },
    hiddenMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeOutLeft";
      menu.style.display = "none";
      menu.style.display = "block";
    },
    addTeam: function () {
      this.teams.push(
        <NewTeam id={localStorage.teamId} remove={this.removeTeam} />
      );
      localStorage.nbTeam++;
      localStorage.teamId++;
    },
    displayParam: function () {
      const params = document.querySelector("#params");
      const go = document.querySelector(".go");
      if (params.style.display == "" || params.style.display == "none") {
        params.style.display = "block";
        document
          .querySelector(".skewed-param")
          .setAttribute("style", "height: 25em");
        document
          .querySelector("#teams")
          .setAttribute("style", "margin-top: 3rem;");
        if (go.className.includes("bounceIn")) this.displayBtn();
      } else {
        params.style.display = "none";
        document
          .querySelector(".skewed-param")
          .setAttribute("style", "height: 5em");
        document
          .querySelector("#teams")
          .setAttribute("style", "margin-top: 2rem;");
        if (go.className.includes("bounceOut")) this.displayBtn();
      }
    },
    displayBtn() {
      const toggle = document.querySelector(".btn-toggle");
      const go = document.querySelector(".go");
      const add = document.querySelector(".add-team-button");
      if (go.className.includes("bounceIn")) {
        go.className =
          "go animate__animated animate__bounceOut animate__delay-1s";
        add.className = "add-team-button animate__animated animate__bounceOut";
        toggle.setAttribute("style", "transform: rotate(-270deg)");
      } else {
        go.className = "go animate__animated animate__bounceIn";
        add.className =
          "add-team-button animate__animated animate__bounceIn animate__delay-1s";
        toggle.setAttribute("style", "transform: rotate(0)");
        go.style.display = "flex";
        add.style.display = "flex";
      }
    },
    // initialise la partie avec toutes les équipes
    init() {
      if (localStorage.started == "false") {
        // team <array> & resFinal <array>
        let res = Array.from(this.getTeam(new Map()), ([name, value]) => ({
          name,
          value,
        }));
        localStorage.setItem("team", JSON.stringify(res));
        localStorage.setItem("resFinal", JSON.stringify(res));
      }
      if (localStorage.listMatch == "" || localStorage == "") {
        localStorage.setItem("listMatch", JSON.stringify(this.listGame()));
        localStorage.totalMatch = JSON.parse(localStorage.listMatch).length;
      }
      if (
        JSON.parse(localStorage.getItem("team")).size < 2 &&
        localStorage.poolFinish == "true"
      )
        localStorage.gameFinish = "true";
      localStorage.getGameFinish = "true";
      if (localStorage.gameFinish == "true")
        localStorage.setItem("team", localStorage.resFinal);
    },
    // récupère toutes les équipes
    getTeam: function (team) {
      for (let i = 1; i <= localStorage.nbTeam; i++) {
        let players = [];
        const teamName = document.querySelector("#team-input" + i).value;
        const listPlayers = document
          .querySelector("#team" + i)
          .querySelectorAll(".team-input1");
        for (let j = 0; j < listPlayers.length; j++) {
          if (listPlayers[j].value != "")
            players.push(listPlayers[j].value + " ");
        }
        if (teamName != "") team.set(i, [teamName, players, 0]);
        else team.set(i, ["Équipe n°" + i, players, 0]);
      }
      return team;
    },
    // Créer une liste de match aléatoire
    listGame: function () {
      let res = "";
      let match = [];
      for (let i = 1; i <= localStorage.nbTeam; i++) {
        for (let j = 1; j <= localStorage.nbTeam; j++) {
          if (i != j) {
            if (res.includes([j, i]) == false) {
              res += "," + i + "," + j;
            }
          }
        }
      }
      res = res.split(",").join("");
      for (let i = 0; i < res.length; i += 2) {
        match.push([res[i], res[i + 1]]);
      }
      return match.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style scoped>
.add-team-button {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 14rem;
  right: 1.5rem;
  border-radius: 10rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  width: 3rem;
  height: 3rem;
  background-color: var(--primary-color);
  z-index: 10;
}

.go {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10rem;
  right: 1.5rem;
  font-size: 1.2rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-color);
  border-radius: 10rem;
  height: 3rem;
  width: 3rem;
  z-index: 10;
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

.go a {
  margin-left: 0.2rem;
}

.skewed-param {
  position: absolute;
  top: 3em;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 5em;
  background-color: var(--primary-color);
  z-index: -1;
  transform: skewY(-1deg);
  transform-origin: top left;
  opacity: 0.4;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

#param-header {
  position: relative;
}

#params {
  display: none;
  color: white;
}

#mode-param {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin-top: 4rem;
}

#mode,
#param {
  display: flex;
  align-content: center;
}

#mode select,
#param input {
  margin-top: 0.2rem;
  height: 2.2rem;
  width: 100%;
}

#mode {
  display: flex;
  flex-direction: column;
}

#mode select {
  border: transparent !important;
  border-radius: 0.2rem;
  margin-top: 1rem;
}

#param {
  margin-top: 2rem;
  position: relative;
}

#teams {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  padding-bottom: 10rem;
}
</style>