import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortDown, faTimes, faBars, faEllipsisH, faInfoCircle, faHome, faSlidersH, faTrophy, faDice, faRandom, faEdit, faChevronLeft, faPlay, faPlus, faPen, faCogs } from "@fortawesome/free-solid-svg-icons";
library.add(faSortDown, faTimes, faBars, faEllipsisH, faInfoCircle, faHome, faSlidersH, faTrophy, faDice, faRandom, faEdit, faChevronLeft, faPlay, faPlus, faPen, faCogs);

createApp(App).use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
