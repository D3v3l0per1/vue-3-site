<template>
    <div style="overflow-y: scroll; height: 100vh;">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center style="margin: 25rem 0;" v-if="loading">
            <v-progress-circular indeterminate :size="60" color="primary"></v-progress-circular>
          </v-flex>
          <v-flex xs12 v-else>
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="primary--text">View Some News and Blog Posts of me :D</h1>
              </v-flex>
              <v-flex xs12>
                <hr class="primary mt-1 mb-3">
              </v-flex>
              <v-flex xs12>
                <v-text-field append-icon="search" class="mt-3" flat label="Search..." solo-inverted></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-carousel class="mb-4">
                  <v-carousel-item v-for="post in posts" :key="post.id" :src="post.imageUrl">
                    <div class="title">{{post.title}}</div>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
              <v-flex xs12>
                <h1 class="primary--text headline">Latest Posts</h1>
                <hr class="primary mt-1 mb-3">
              </v-flex>
              <v-flex xs12 sm6 v-for="post in posts" :key="post.id" class="pa-1">
                <v-card>
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
              <v-flex xs12>
                <v-divider class="mt-5"></v-divider>

                <v-container text-xs-center>
                  <v-btn large class="primary" to="/posts">View all Posts</v-btn>
                </v-container>
              </v-flex>
            </v-layout>
          </v-flex>
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
    }
  },
  methods: {
    onLoadPost (id) {
      this.$router.push('/posts/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
