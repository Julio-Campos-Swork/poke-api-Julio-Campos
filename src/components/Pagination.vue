<template>
 <div class="text-center">
      {{ cambiarPag }}
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <v-container class="max-width" fluid >
              <v-pagination
            
                v-model="actual"
                class="my-4"
                :length="pags"
                :total-visible="7"
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
import { mapState, mapActions} from "vuex";
export default {
  data() {
    return {
      actual: 1,
      temp: 1,
      pags: 45,
    };
  },
  computed: {
    ...mapState(["prev", "next","pokemones"]),

    cambiarPag() {
      if (this.temp == this.actual) {
      } else {
        let pagina = 20;
        this.temp = this.actual;
        pagina = pagina * this.actual
        this.$store.dispatch("getPokemones", `https://pokeapi.co/api/v2/pokemon/?offset=${pagina}&limit=20`);
      }
    },
  },


  methods: {
    ...mapActions(["getPokemones"]),
    sPrev() {
      setTimeout(() => {
        if (this.prev !== null) {
          this.$store.dispatch("getPokemones", this.prev);
        } else {
          console.log("Error");
        }
      }, 3000);
    },
    sNext() {
      setTimeout(() => {
        if (this.next !== null) {
          this.$store.dispatch("getPokemones", this.next);
        } else {
          console.log("Error");
        }
      }, 1000);
    },
  },
};
</script>
