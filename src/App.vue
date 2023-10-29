<template>
  <header>
    <Navbar />
  </header>
  <main class="themeBg">
    <div class="container-fluid">
      <section class="row">
        <div class="col-12 col-md-10">
          <router-view />
        </div>
        <div class="col-12 col-md-2">
          <AdCard />
        </div>
      </section>
    </div>
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Lato&display=swap');

:root {
  --main-height: calc(100vh - 32px - 64px);
  --themeGreen1: #186F65;
  --themeGreen2: #B5CB99;
  --themeTan: #ffe9b0;
  --themeBrown: #B2533E;
  --themeLightBrown: #eb9368c9;
  --themeRed: rgb(182, 31, 31);
}

body {
  font-family: 'Lato', sans-serif;
  font-size: 16pt;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: var(--themeGreen1);
  color: var(--themeTan);
}

a {
  color: var(--themeGreen1);
}

.hidden {
  display: none;
}

.btn-theme-danger {
  border: 2px solid var(--themeGreen1);
  font-size: 16pt;
  color: var(--themeTan);
  background-color: var(--themeRed);
}

.btn-theme-danger:hover {
  background-color: var(--themeGreen1);
  color: black;
  border: 2px solid var(--themeRed);
  font-weight: bolder;
}

.btn-theme2 {
  background-color: var(--themeBrown);
  color: var(--themeTan);
  border: 2px solid var(--themeGreen1);
  font-size: 16pt;
}

.btn-theme2:hover {
  background-color: var(--themeGreen1);
  color: var(--themeBrown);
  border: 2px solid var(--themeBrown);
}

.btn-theme {
  background-color: var(--themeBrown);
  color: var(--themeTan);
  border: 2px solid var(--themeGreen2);
  font-size: 16pt;
}

.btn-theme:hover {
  background-color: var(--themeGreen2);
  color: var(--themeBrown);
  border: 2px solid var(--themeBrown);
}

.themeBg {
  background-color: var(--themeTan);
}

.title-color {
  background-color: var(--themeGreen1);
  color: var(--themeTan);
}

.title-color:hover {
  color: var(--themeGreen2);
  transition: .3s;
}

.font-themeGreen {
  color: var(--themeGreen1);
}

.light-brown-bg {
  background-color: var(--themeLightBrown);
}

.agbalumo {
  font-family: Agbalumo, sans-serif;
}

.bg-blur {
  color: var(--themeTan);
  background-color: rgba(73, 24, 24, 0.729);
  backdrop-filter: blur(15px);
  width: 18%;
  text-align: center;
}

#app {
  font-family: 'Lato', sans-serif;
}
</style>
