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
    captured: [],
  },
  getters: {},
  mutations: {
    setPokemones(state, payload) {
      //definir un array temp para poder hacer el foreach
      //payload trae el array que viene del Axios
      let temp = [];
      payload.forEach((element) => {
        temp.push({
          name: element.name,
          url: element.url,
          status: 0,
        });
      });

      //temp2 representa el guardado de lo que tenemos en local storage haciendo recorrido del mismo por foreach
      //integrando con "findIndex" para poder encontrar el index
      //si al hacer una nueva evaluacion en la siguiente pagina no encuentra index
      //saltara el proceso y estaremos asignando los valores a state para poder mostrarlos
      let temp2 = JSON.parse(localStorage.getItem("captured"));
      temp2.forEach((ele) => {
        let index = temp.findIndex((ele2) => ele.name === ele2.name);
        if (index == -1) {
        } else {
          temp[index].status = 1;
        }
      });
      state.pokemones = temp;
      state.captured = temp2;
    },

    setFreePokemon(state, payload) {
      //utilizamos el filter para buscar lo que ya tenemos captured y si lo tenemos para liberar se libera

      let temp = state.captured.filter((el) => el.name !== payload[0]);
      let temp2 = state.pokemones;

      temp2[payload[1]].status = 0;
      state.pokemones = temp2;
      state.captured = temp;
      localStorage.setItem("captured", JSON.stringify(state.captured));
    },

    setFreePokemonX(state, payload) {
      let freePokemon = state.pokemones; //creamos nueva variable para el metodo
      let index = freePokemon.findIndex((ele2) => payload[0] === ele2.name); //findindex de nuestros pokemones para poder asignar el status a 0
      if (index == -1) {
      } else {
        freePokemon[index].status = 0;
      }//al volver 0 el valor de status reasignamos a pokemones
      state.pokemones = freePokemon;
      let freecaptured = state.captured.filter(
        (el) => el.name !== payload[0]
      );//Hacemos filter para eliminar la concidencia de nombre del captured y eliminarlo del local storage
      state.captured = freecaptured;
      localStorage.setItem("captured", JSON.stringify(state.captured));
    },

    setCaptured(state, payload) {
      //asignamos al espacio de memoria "captured" lo que llegue de nuestro payload (en este caso es un array)
      //asignamos un status para demostrar que esta captured y evaluarlo
      let temp = JSON.parse(localStorage.getItem("captured"));
      let temp2 = state.pokemones;
      temp2[payload[1]].status = 1;

      let newUrl = payload[2].split(["/"]);

      temp.push({ name: payload[0], id: newUrl[6] });

      localStorage.setItem("captured", JSON.stringify(temp));
      state.captured = temp;
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
    setLoading(state, payload) {
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
    getCaptured({ commit }, payload) {
      commit("setCaptured", payload);
    },

    getFreePokemon({ commit }, payload) {
      commit("setFreePokemon", payload);
    },
    getFreePokemonX({ commit }, payload) {
      commit("setFreePokemonX", payload);
    },
    getLoading({ commit }, payload){
      commit ("setLoading", payload)
    }
  },
  modules: {},
});
