<template>
  <div>
    <Banner />
    <Card ref="compdialog" />
    <Pokedesk />
    <div>
      <v-card elevation="0" tile class="mx-auto">
        <v-container>
          <v-row v-if="loading == true">
            <Loader />
          </v-row>
          <v-row justify="center" align="center" v-else>
            <v-col
              order="3"
              align-self="auto"
              md="3"
              v-for="(poke, index) in pokemones"
              :key="index"
            >
              <v-card
                light
                rounded="xl"
                color="#FFF8E1"
                class="mx-auto"
                max-height="500"
                max-width="250"
                hover
              >
                <v-card-title class="green--text text-center" v-text="poke.name.toUpperCase()">
                  
                </v-card-title>

                <div>
                  <v-img
                    max-height="250"
                    max-width="220"
                    min-height="70"
                    min-width="70"
                    lazy-src="../assets/loading3.gif"
                    transition="true"
                    :src="getImg(poke.url)"
                    position="center"
                  >
                  </v-img>
                  <br />
                </div>
                <div>
                  <v-row justify="center">
                    <v-img
                      v-if="poke.status === 0"
                      src="../assets/Pokebola-abierta.png"
                      @click="getCapture([poke.name, index, poke.url])"
                      color="primary"
                      max-width="70"
                      max-height="70"
                    >
                    </v-img>

                    <v-img
                      v-else
                      src="../assets/Pokebola.png"
                      @click="getFreePokemon([poke.name, index])"
                      color="warning"
                      max-width="70"
                      max-height="70"
                    >
                    </v-img>
                    <v-img
                      @click="watchInfo(poke.url)"
                      src="../assets/pokedesk.png"
                      max-width="70"
                      max-height="70"
                    >
                    </v-img>
                  </v-row>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>

    <Pagination />

    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Banner from "../components/Banner.vue";
import Footer from "../components/Footer.vue";
import Loader from "../components/Loader.vue";
import Card from "../components/Card.vue";
import Pokedesk from "../components/Pokedesk.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "Inicio",
  data() {
    return {
      
    };
  },
  components: {
    Banner,
    Footer,
    Loader,
    Card,
    Pokedesk,
    Pagination,
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("getPokemones", this.baseUrl);
    }, 2000);

    if (localStorage.getItem("capture")) {
    } else {
      localStorage.setItem("capture", JSON.stringify([]));
    }
  },

  computed: {
    ...mapState([
      "pokemon",
      "pokemones",
      "status",
      "baseUrl",
      "next",
      "prev",
      "loading",
      "capture",
    ]),

    
  },
  methods: {
    ...mapActions(["getPokemon", "getPokemones", "getCapture","getFreePokemon"]),

    getImg(url) {
      let newUrl = url.split(["/"]);
      let urlImg =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

      return `${urlImg}${newUrl[6]}.png`;
    },
    
    watchInfo(index) {
      this.$store.dispatch("getPokemon", index);
      setTimeout(() => {
        this.$refs.compdialog.abrirModal(index);
      }, 1000);
    },
  },
};
</script>

<style></style>
