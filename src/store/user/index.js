import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    UserLikePost (state, payload) {
      const id = payload.id
      if (state.user.likes.findIndex(post => post.id === id) >= 0) {
        return
      }
      state.user.likes.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    UserUnlikePost (state, payload) {
      const likes = state.user.likes
      likes.splice(likes.findIndex(post => post.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedPosts (state, payload) {
      state.loadedPosts = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    UserLikePost ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/likes/')
        .push(payload)
        .then(
          data => {
            commit('setLoading', false)
            commit('UserLikePost', {id: payload, fbKey: data.key})
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    UserUnikePost ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/likes/').child(fbKey)
        .remove()
        .then(
          () => {
            commit('setLoading', false)
            commit('UserUnlikePost', payload)
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
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
              likes: [],
              fbKeys: {}
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
              likes: [],
              fbKeys: {}
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
      commit('setUser', {id: payload.uid, likes: [], fbKeys: {}})
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/likes/').once('value')
        .then(
          data => {
            const dataPairs = data.val()
            let likes = []
            let swappedPairs = {}
            for (let key in dataPairs) {
              likes.push(dataPairs[key])
              swappedPairs[dataPairs[key]] = key
            }
            const updateUser = {
              id: getters.user.id,
              likes: likes,
              fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updateUser)
          }
        )
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
