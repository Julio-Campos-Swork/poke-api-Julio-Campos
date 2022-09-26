import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: "https://pokeapi.co/api/v2/pokemon/",
    pokemones: [],

    pokemon: {
      name: "",
      img: "",
      weight: "",
      height: "",
      stats: "",
      abilities: "",
      moves: "",
      types: "",
    },
    next: "",
    prev: "",
    status: 0,
    loading: false,
    capture: [],
  },
  getters: {},
  mutations: {
    setPokemones(state, payload) {
      //definir un array newArrayPokemones para poder hacer el foreach
      //payload trae el array que viene del Axios
      let newArrayPokemones = [];
      payload.forEach((element) => {
        newArrayPokemones.push({
          name: element.name,
          url: element.url,
          status: 0,
        });
      });

      //newArrayCapture representa el guardado de lo que tenemos en local storage haciendo recorrido del mismo por foreach
      //integrando con "findIndex" para poder encontrar el index
      //si al hacer una nueva evaluacion en la siguiente pagina no encuentra index
      //saltara el proceso y estaremos asignando los valores a state para poder mostrarlos
      let newArrayCapture = JSON.parse(localStorage.getItem("capture"));
      newArrayCapture.forEach((ele) => {
        let index = newArrayPokemones.findIndex((ele2) => ele.name === ele2.name);
        if (index == -1) {
        } else {
          newArrayPokemones[index].status = 1;
        }
      });
      state.pokemones = newArrayPokemones;
      state.capture = newArrayCapture;
    },

    freePokemon(state, payload) {
      //utilizamos el filter para buscar lo que ya tenemos capture y si lo tenemos para freePokemon se libera

      let tempArrayCapture = state.capture.filter((el) => el.name !== payload[0]);
      let tempArrayPokemones = state.pokemones;

      tempArrayPokemones[payload[1]].status = 0;
      state.pokemones = tempArrayPokemones;
      state.capture = tempArrayCapture;
      localStorage.setItem("capture", JSON.stringify(state.capture));
    },

    freePokemonX(state, payload) {
      let freePokemon = state.pokemones; //creamos nueva variable para el metodo
      let index = freePokemon.findIndex((ele2) => payload[0] === ele2.name); //findindex de nuestros pokemones para poder asignar el status a 0
      if (index == -1) {
      } else {
        freePokemon[index].status = 0;
      }//al volver 0 el valor de status reasignamos a pokemones
      state.pokemones = freePokemon;
      let freecapture = state.capture.filter(
        (el) => el.name !== payload[0]
      );//Hacemos filter para eliminar la concidencia de nombre del capture y eliminarlo del local storage
      state.capture = freecapture;
      localStorage.setItem("capture", JSON.stringify(state.capture));
    },

    capturePokemon(state, payload) {
      //asignamos al espacio de memoria "capture" lo que llegue de nuestro payload (en este caso es un array)
      //asignamos un status para demostrar que esta capture y evaluarlo
      let temp = JSON.parse(localStorage.getItem("capture"));
      let temp2 = state.pokemones;
      temp2[payload[1]].status = 1;

      let newUrl = payload[2].split(["/"]);

      temp.push({ name: payload[0], id: newUrl[6] });

      localStorage.setItem("capture", JSON.stringify(temp));
      state.capture = temp;
      state.pokemones = temp2;
    },

    setPokemon(state, payload) {
      state.pokemon = { ...payload };
    },
    setNext(state, payload) {
      state.next = payload;
    },
    setPrev(state, payload) {
      state.prev = payload;
    },
    setloading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getPokemones({ commit }, url) {
      try {
        const resp = await axios.get(url);
        const data = await resp.data.results;
        const next = resp.data.next;
        const prev = resp.data.previous;

        commit("setPokemones", data);
        commit("setPrev", prev);
        commit("setNext", next);
      } catch (error) {
        console.log(error);
      }
    },

    async getPokemon({ commit }, url) {
      try {
        const res = await axios.get(url);
        const data = await res.data;
        const pokemon = {
          name: data.name,
          img: data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
          weight: data.weight,
          height: data.height,
          stats: data.stats,
          abilities: data.abilities,
          moves: data.moves,
          types: data.types,
        };
        commit("setPokemon", pokemon);
      } catch (error) {
        console.log(error);
      }
    },
    getCapture({ commit }, payload) {
      commit("capturePokemon", payload);
    },

    getFreePokemon({ commit }, payload) {
      commit("freePokemon", payload);
    },
    getfreePokemonX({ commit }, payload) {
      commit("freePokemonX", payload);
    },
    getLoading({commit}, payload){
      commit("setloading", payload)
    },
  },
  modules: {},
});
