<template>
  <header>
    <Navbar />
  </header>
  <main class="themeBg">
    <div class="container-fluid">
      <section class="row">
        <div class="col-10">
          <router-view />
        </div>
        <div class="col-2">
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

:root {
  --main-height: calc(100vh - 32px - 64px);
  --themeGreen1: #186F65;
  --themeGreen2: #B5CB99;
  --themeTan: #ffe9b0;
  --themeBrown: #B2533E;
}

.themeBg {
  background-color: var(--themeTan);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: var(--themeGreen1);
  color: var(--themeTan);
}
</style>
