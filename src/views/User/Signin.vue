<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
        <v-flex xs12>
          <v-card class="mb-3">
            <form @submit.prevent="onSignIn">
              <v-card-title primary-title>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h1 class="primary--text">Signin to your Account</h1>
                    <hr class="primary">
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field name="email" label="Your Email" id="email" v-model="email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="password" label="Your Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :disabled="loading" :loading="loading" type="submit">Sign In</v-btn>
              </v-card-actions>
            </form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
      // console.log({email: this.email, confirmEmail: this.confirmEmail, password: this.password, confirmPassword: this.confirmPassword})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
