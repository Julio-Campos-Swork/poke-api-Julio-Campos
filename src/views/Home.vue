<template>
  <div>
    <Banner />
    <br>
      <div class="text-center">
        <router-link to="/Inicio">
        <v-btn 
      color="blue lighten-1 accent-4"
      class="white--text"
      @click="overlay = !overlay"
      
      
    >
      Inicia tu Aventura Pokemon
      
    </v-btn></router-link>
    
    

    <v-overlay  :value="overlay">
      <v-progress-circular 
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
  <br>
    <v-img  
  contain
  aspect-ratio
  src="../assets/fondo.jpg"
  
>
</v-img>
    

    
<Footer />
  </div>
  
</template>

<script>
   
    import Banner from '../components/Banner.vue'
    import Footer from '../components/Footer.vue'


export default {
name: 'Home',
data: () => ({
overlay: false
}),

watch:{
  overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
},
components:{
   Footer, Banner
}
}
</script>
