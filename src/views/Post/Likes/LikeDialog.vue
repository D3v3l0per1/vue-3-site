<template>
  <v-dialog persistent v-model="likeDialog">
    <v-btn icon accent slot="activator">
      <v-icon>{{ userLikedPost ? 'favorite' : 'favorite_border' }}</v-icon>
    </v-btn>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 class="grey darken-2">
          <v-card-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h6 class="headline" v-if="userLikedPost">Unlike the Post?</h6>
                <h6 class="headline" v-else>Like the Post?</h6>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-flex> 
        <v-flex xs12>
          <v-card-text>
            <p>U can always change your decisions later on...</p>
          </v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-btn flat class="red--text" @click="likeDialog = false">Chancel</v-btn>
            <v-btn flat class="success" @click="onAgree">Confirm</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['postId'],
  data () {
    return {
      likeDialog: false
    }
  },
  computed: {
    userLikedPost () {
      return this.$store.getters.user.likes.findIndex(postId => {
        return postId === this.postId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userLikedPost) {
        this.$store.dispatch('UserUnikePost', this.postId)
      } else {
        this.$store.dispatch('UserLikePost', this.postId)
      }
    }
  }
}
</script>
