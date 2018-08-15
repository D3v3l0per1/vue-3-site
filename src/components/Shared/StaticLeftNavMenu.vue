<template>
  <div>
    <v-container class="hidden-sm-and-down">
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

      <v-layout row wrap class="hidden-sm-and-up">
        <v-flex xs12 text-xs-right>
          <v-toolbar-side-icon @click="sideNav = true"></v-toolbar-side-icon>
        </v-flex>
      </v-layout>

    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-toolbar flat>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>sad_c0der</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { title: 'Home', link: '/', icon: 'dashboard' },
        { title: 'Posts', link: '/posts', icon: 'question_answer' },
        { title: 'References', link: '/references', icon: '' },
        { title: 'Other', link: '/other', icon: '' }
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
