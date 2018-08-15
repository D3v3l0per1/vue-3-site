<template>
  <v-app dark>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 text-xs-center>
        <StaticLeftNavMenu />
      </v-flex>
      <v-flex xs12 sm6>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}

</script>
