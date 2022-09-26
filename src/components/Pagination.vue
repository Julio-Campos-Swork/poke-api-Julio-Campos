<template>
  <div class="text-center">
    {{ changePag }}
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <v-container class="max-width" fluid>
            <v-pagination
              :disabled="display"
              v-model="actualPage"
              class="my-4"
              :length="pags"
              :total-visible="10"
              light
              color="#DD2C00"
              @next="sNext()"
              @previous="sPrev()"
            >
            </v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      actualPage: 1,
      actualPageComparation: 1,
      pags: 47,
      display: false,
    };
  },
  computed: {
    ...mapState(["prev", "next", "pokemones", "loading"]),

    changePag() {
      let loader = true;
      this.$store.dispatch("getLoading", loader);
      if (this.actualPageComparation == this.actualPage) {
      } else {
        this.display = true;
        let clickPag = 20;
        this.actualPageComparation = this.actualPage;
        clickPag = clickPag * this.actualPage;
        this.$store.dispatch(
          "getPokemones",
          `https://pokeapi.co/api/v2/pokemon/?offset=${clickPag}&limit=20`
        );
      }
      setTimeout(() => {

        loader = false;
        this.$store.dispatch("getLoading", loader);
        this.display = false;
      }, 3000);
    },
  },

  methods: {
    ...mapActions(["getPokemones", "getLoading"]),
    sPrev() {
      let loader = true;
      this.$store.dispatch("getLoading", loader);

      setTimeout(() => {
        if (this.prev !== null) {
        this.$store.dispatch("getPokemones", this.prev);
      } else {
        console.log("Error");
      }
        loader = false;
        this.$store.dispatch("getLoading", loader);

      }, 2000);
    },
    sNext() {
      let loader = true;
      this.$store.dispatch("getLoading", loader);

      
      setTimeout(() => {
        if (this.next !== null) {
        this.$store.dispatch("getPokemones", this.next);
      } else {
        console.log("Error");
      }
        loader = false;
        this.$store.dispatch("getLoading", loader);

      }, 2000);
    },
  },
};
</script>
