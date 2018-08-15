<template>
  <v-container>
    <v-card>
      <v-card-title><h1 class="primary--text">About me</h1></v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        <v-avatar size="125px">
          <img class="imag-circle elveation-7 mb-4" src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg" alt="">
        </v-avatar>
        <div class="headline">sad_c0der</div>
        <p class="text-xs-left ml-5 mr-5">Hey guys, <br> I'm sad_c0der as u maybe already read... I'm a webdev and pentester i also post some shitty ass news pls support me and read my blog :D</p>
      </v-card-text>
      <v-divider class="mt-3 mb-1"></v-divider>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs12 sm3 v-for="item in menuItems" :key="item.title">
            <v-btn flat class="primary--text" :to="item.link">{{item.title}}</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-layout row wrap class="mt-5" v-if="!userIsAuthenticated">
      <v-flex xs12 sm6 text-sm-right>
        <v-btn class="primary" to="/signin">SignIn</v-btn>
      </v-flex>
      <v-flex xs12 sm6 text-sm-left>
        <v-btn class="primary" to="/signup">SignUp</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center class="mt-5" v-if="userIsAuthenticated">
        <v-btn class="primary" @click="onLogout">Logut</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      menuItems: [
        { title: 'Home', link: '/' },
        { title: 'Posts', link: '/posts' },
        { title: 'References', link: '/references' },
        { title: 'Other', link: '/other' }
      ]
    }
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
