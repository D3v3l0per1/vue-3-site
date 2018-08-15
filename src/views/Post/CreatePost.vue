<template>
  <div style="overflow-y: scroll; height: 100vh;">
    <v-container>
      <v-card class="mb-3">
        <form @submit.prevent="onCreatePost">
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="primary--text">Crearte a Post</h1>
                <hr class="primary">
              </v-flex>
              <v-flex xs12>
                <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-media :src="imageUrl" height="300px"></v-card-media>
          <v-card-text>
            <v-layout row wrap>
              <!-- <v-flex xs12>
                <v-text-field name="imageUrl" label="Image Url" id="imageUrl" v-model="imageUrl" required></v-text-field>
              </v-flex> -->
              <v-flex xs12>
                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="onFilePicked">
              </v-flex>
              <v-flex xs12>
                <v-textarea name="description" label="Description" id="description" v-model="description" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Post</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      imageUrl: '',
      description: '',
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.imageUrl !== '' && this.description !== ''
    }
  },
  methods: {
    onCreatePost () {
      if (!this.formIsValid) {
        return
      }
      const postData = {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      }
      this.$store.dispatch('createPost', postData)
      this.$router.push('/posts')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
