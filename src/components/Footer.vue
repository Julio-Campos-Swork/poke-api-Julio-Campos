<template>
  <div>
    <v-footer light
    
    padless
    rounded
  >
    <v-card rounded
      class="flex"
      flat
      tile
    >
      <v-card-title>
        

      </v-card-title>

      <v-card-text class="py-2 black--text text-center">
        {{ new Date().getFullYear() }} — <strong>PokeApi</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </div>
</template>

<script>
export default {
data() {
    return {
        
    }
},
}
</script>
