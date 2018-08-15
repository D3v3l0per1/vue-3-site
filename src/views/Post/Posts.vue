<template>
  <div style="overflow-y: scroll; height: 100vh;">
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <h1 class="primary--text">All Posts</h1>
        </v-flex>
        <v-flex xs6 text-xs-right v-if="userIsAuthenticated">
          <v-btn class="primary" to="/posts/new">Create Post</v-btn>
        </v-flex>
        <v-flex xs12>
          <hr class="primary mt-2 mb-3">
        </v-flex>
        <v-flex xs12>
          <v-text-field append-icon="search" class="mt-3" flat label="Search..." solo-inverted></v-text-field>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center style="margin: 25rem 0;" v-if="loading">
            <v-progress-circular indeterminate :size="60" color="primary"></v-progress-circular>
          </v-flex>
          <v-flex xs12 v-else>
            <v-card class="mb-3" v-for="post in posts" :key="post.id">
              <v-card-media :src="post.imageUrl" height="300px"></v-card-media>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{post.title}}</div>
                  <span class="grey--text">{{post.date | date}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :to="'/posts/' + post.id">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    posts () {
      return this.$store.getters.featuredPosts
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>
