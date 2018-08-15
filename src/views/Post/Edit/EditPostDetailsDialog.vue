<template>
  <v-dialog width="50%" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 class="grey darken-2">
          <v-card-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h6 class="headline">Edit this Post</h6>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-flex> 
        <v-flex xs12>
          <v-card-media src="https://images8.alphacoders.com/607/thumb-1920-607446.jpg" height="300px"></v-card-media>
        </v-flex>
        <v-card-text>
          <v-flex xs12>
            <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea name="description" label="Description" id="description" v-model="editedDescription" required></v-textarea>
          </v-flex>
        </v-card-text>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="red--text" @click="editDialog = false">Close</v-btn>
            <v-btn flat class="success" @click="onSaveChanges">Save</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.post.title,
      editedDescription: this.post.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updatePostData', {
        id: this.post.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
