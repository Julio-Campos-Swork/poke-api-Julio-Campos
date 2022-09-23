<template>
  <div v-if="index !== false">
    <v-dialog v-model="dialog" scrollable  
       height="950"
        width="650"
        >
      <v-card
        loading="primary"
        light
        rounded="xl"
        color="#FFF8E1"
        class="scrol"
        height="500"
        width="450"
        hover
        
      >
        <div>
          <v-card-title v-text="pokemon.name.toUpperCase()" class="blue--text">
          </v-card-title>
          <v-row justify="center">
            <img :src="pokemon.img" />
          </v-row>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>info</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                >Weight - {{ pokemon.weight }} - Height -
                {{ pokemon.height }}</v-list-item-title
              >
            </v-list-item>
            <v-list-group :value="true" >
              <template v-slot:activator>
                <v-list-item-title>Information</v-list-item-title>
              </template>
              <v-list-group :value="false" no-action sub-group >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Stats</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item  v-for="(st, index) in pokemon.stats" :key="index">
                  {{ st.stat.name }} - {{ st.base_stat }}
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false" no-action sub-group >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Abilities</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(ab, index) in pokemon.abilities"
                  :key="index"
                >
                  {{ ab.ability.name }}
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false" no-action sub-group >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Types</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="(ty, index) in pokemon.types" :key="index">
                  {{ ty.type.name }}
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false" no-action sub-group >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Moves</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="(mv, index) in pokemon.moves" :key="index">
                  {{ mv.move.name }}
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn outlined rounded @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      index: false,
      expand: false,
      model: 1,
    };
  },

  created() {},

  computed: {
    ...mapState(["pokemon", "pokemones"]),
  },
  methods: {
    ...mapActions(["getPokemon"]),

    abrirModal(index2) {
      //metodo para asignar index en este componente
      this.index = index2;
      this.dialog = true;
    },
  },
};
</script>

<style>
.scrol {
  width: auto;
  height: auto;
  overflow-y: scroll;
}

</style>
