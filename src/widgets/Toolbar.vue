<template>
  <v-toolbar
    color="red"
    dense
    fixed
    clipped-left
    app
  >
    <v-toolbar-side-icon @click.stop="$emit('click:side-icon', $event)"></v-toolbar-side-icon>
    <!-- <v-icon class="mx-3">fa-youtube</v-icon> -->
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Modular Web Sketch</span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'toolbar'
}
</script>
