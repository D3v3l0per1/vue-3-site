import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [
      {
        id: '84u38143gi2137',
        title: 'First Post',
        tags: ['test', 'lol', 'news'],
        imageUrl: 'https://cdn-images-1.medium.com/max/2000/1*U_eJPIcf9svqQLqmF5L-eQ.jpeg',
        date: new Date(),
        description: 'lorem ipsum dolor it samet lol...'
      },
      {
        id: 'rf4kj45tvkk',
        title: 'Second Post',
        tags: ['test', 'granny', 'old'],
        imageUrl: 'http://www.guoguiyan.com/data/out/160/68435293-random-wallpapers.png',
        date: new Date(),
        description: 'lorem ipsum dolor it lol...'
      },
      {
        id: 'asdfaw43243',
        title: 'Seconssd Post',
        tags: ['test', 'grdanny', 'odsld'],
        imageUrl: 'https://vignette.wikia.nocookie.net/blogclan-2/images/4/45/Random-turtle.gif/revision/latest?cb=20160706220110',
        date: new Date(),
        description: 'lorem ipsum dolor it lssol...'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedPosts (state, payload) {
      state.loadedPosts = payload
    },
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadPosts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('/posts/').once('value')
        .then(
          (data) => {
            const posts = []
            const obj = data.val()
            for (let key in obj) {
              posts.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                creatorId: obj[key].creatorId
              })
            }
            commit('setLoadedPosts', posts)
            commit('setLoading', false)
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createPost ({commit, getters}, payload) {
      const post = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('/posts/').push(post)
        .then(
          (data) => {
            key = data.key
            return key
          }
        )
        .then(
          key => {
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('/posts/' + key + '.' + ext).put(payload.image)
          }
        )
        .then(
          fileData => {
            let imagePath = fileData.metadata.fullPath
            return firebase.storage().child(imagePath).getDownloadURL()
          }
        )
        .then(
          url => {
            imageUrl = url
            return firebase.database().ref('/posts/').child(key).update({imageUrl: imageUrl})
          }
        )
        .then(
          commit('createPost', {
            ...post,
            id: key
          })
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              likes: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              likes: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, likes: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postA.date < postB.date
      })
    },
    featuredPosts (state, getters) {
      return getters.loadedPosts.slice(0, 5)
    },
    loadedPost (state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
