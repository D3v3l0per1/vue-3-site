<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 v-if="error">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
        <v-flex xs12>
          <v-card class="mb-3">
            <form @submit.prevent="onSignUp">
              <v-card-title primary-title>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h1 class="primary--text">Create Account</h1>
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
                    <v-text-field name="confirmEmail" label="Confirm Email" id="confirmEmail" v-model="confirmEmail" :rules="[compareEmails]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="password" label="Your Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :disabled="loading" :loading="loading" type="submit">Sign Up</v-btn>
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
      password: '',
      confirmEmail: '',
      confirmPassword: ''
    }
  },
  computed: {
    compareEmails () {
      return this.email !== this.confirmEmail ? 'Emails do not match' : ''
    },
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
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
    onSignUp () {
      this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
      // console.log({email: this.email, confirmEmail: this.confirmEmail, password: this.password, confirmPassword: this.confirmPassword})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
