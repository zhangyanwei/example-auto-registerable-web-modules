<template>
  <div id="app">
    <v-app
      dark
      id="inspire"
    >
      <x-navigation-drawer v-model="drawer"></x-navigation-drawer>
      <x-toolbar @click:side-icon="drawer = !drawer"></x-toolbar>
      <x-content></x-content>
    </v-app>
  </div>
</template>

<script>
import XNavigationDrawer from './widgets/NavigationDrawer'
import XToolbar from './widgets/Toolbar'
import XContent from './widgets/Content'

export default {

  name: 'app',

  components: {
    XNavigationDrawer,
    XToolbar,
    XContent
  },

  data () {
    return {
      drawer: true
    }
  }
}
</script>
