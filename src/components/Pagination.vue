<template>
  <div class="text-center">
    {{ changePag }}
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <v-container class="max-width" fluid>
            <v-pagination
              :disabled="display"
              v-model="actualPag"
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
      actualPag: 1,
      tempActualPag: 1,
      pags: 57,
      display: false,
    };
  },
  computed: {
    ...mapState(["prev", "next", "pokemones"]),

    changePag() {
      if (this.tempActualPag == this.actualPag) {
        } else {
          this.display = true;
          let loading = true;
          this.$store.dispatch("getLoading", loading);
          let page = 20;
          this.tempActualPag = this.actualPag;
          page = page * this.actualPag;
          this.$store.dispatch(
            "getPokemones",
            `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`
          );
          
         
        }
      setTimeout(() => {
        this.loading = false;
          this.display = false;
          this.$store.dispatch("getLoading", this.loading);
        
      }, 3000);
      
    },
  },

  methods: {
    ...mapActions(["getPokemones"]),
    sPrev() {
      let loading = true;
      this.$store.dispatch("getLoading", loading);
      this.display = true;
      setTimeout(() => {
        if (this.prev !== null) {
          this.$store.dispatch("getPokemones", this.prev);
          this.loading = false;
          this.display = false;
          this.$store.dispatch("getLoading", this.loading);
        } else {
          console.log("Error");
        }
      }, 3000);
      
    },
    sNext() {
      let loading = true;
      this.$store.dispatch("getLoading", loading);
      this.display = true;
      setTimeout(() => {
        if (this.next !== null) {
          this.$store.dispatch("getPokemones", this.next);
          this.loading = false;
          this.display = false;
          this.$store.dispatch("getLoading", this.loading);
        } else {
          console.log("Error");
        }
      }, 3000);
    },
  },
};
</script>
