<template>
  <div>
    <v-speed-dial
      fab
      bottom
      absolute
      right
      direction="top"
      open-on-hover
      fixed
      transition="slide-y-transition"
    >
      <template v-slot:activator>
        <v-img
          src="../assets/Pokebola.png"
          fab
          max-width="120"
          max-height="120"
          role="button"
          tabindex="0"
          icon
          aria-controls="collapse-2"
        >
          <span class="circle-warning text-xl-left black--text">
            {{ capturado.length }}
          </span>
        </v-img>
      </template>
      <div class="scrol">
        <v-col v-for="(mostrar, index) in capturado" :key="index">
          <v-img fab max-width="100" max-height="100" :src="getUrl(mostrar.id)">
           <span> <v-icon
              color="#E53935"
              left
              @click="liberar([mostrar.name, index])"
            >
              highlight_off
            </v-icon></span>
          </v-img>
        </v-col>
      </div>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    ...mapState(["capturado"]),
  },
  methods: {
    getUrl(id) {
      let gif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
      return gif;
    },
    liberar(name) {
      this.$store.dispatch("getLiberarX", name);
    },
  },
};
</script>

<style>
.scrol {
  height: 300px;
  width: 120px;
  overflow-y: auto;
}
.circle-warning {
  color: #212529;
  background-color: #ffeb3b;
}
</style>
