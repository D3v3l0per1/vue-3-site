<template>
  <div style="overflow-y: scroll; height: 100vh;">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 text-xs-center style="margin: 25rem 0;" v-if="loading">
          <v-progress-circular indeterminate :size="60" color="primary"></v-progress-circular>
        </v-flex>
        <v-flex xs12 v-else>
          <v-card class="mb-3">
            <v-card-title primary-title>
              <div class="headline">{{post.title}}</div>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-post-details-dialog :post="post"></app-edit-post-details-dialog>
              </template>
            </v-card-title>
            <v-card-media :src="post.imageUrl" height="300px"></v-card-media>
            <v-card-text>
              <div>
                <span class="grey--text">Posted at {{post.date | date}} by sad_c0der</span>
                <v-divider class="mt-2 mb-2"></v-divider>
                <p style="white-space: pre-wrap;">{{ post.description }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <app-like-post-details-dialog :postId="post.id" v-if="userIsAuthenticated && !userIsCreator"></app-like-post-details-dialog>
              <!-- <v-btn class="primary--text" icon><v-icon>favorite</v-icon></v-btn> -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    post () {
      return this.$store.getters.loadedPost(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.post.creatorId
    }
  }
}
</script>
