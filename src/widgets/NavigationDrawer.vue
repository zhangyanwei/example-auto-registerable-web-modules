<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list dense>

      <!-- Dynamic menus from modules -->
      <template v-for="item in items">
        <v-list-group
          v-if="item.items"
          :key="item.$id"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.$id"
            @click="onMenuClick(item)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :key="item.$id" @click="onMenuClick(item)">
          <v-list-tile-action>
            <v-progress-circular
              v-if="item.$loading"
              style="align-self: start;"
              indeterminate
            ></v-progress-circular>
            <v-icon else>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-list-tile class="mt-3" @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">add_circle_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { menus } from '../modules'

export default {

  name: 'navigation-drawer',

  props: {
    value: {
      type: Boolean
    }
  },

  data () {
    return {
      items: [],
      nextId: 0
    }
  },

  methods: {
    onMenuClick (item) {
      const link = item.link ? item.link.replace(/^\.?\//, '') : ''
      this.$router.push({ path: `/${item.module}${link}` })
    },

    asMenuItem (item, module) {
      return { ...item, module, $id: this.nextId++ }
    }
  },

  created () {
    this.items = menus.map(menu => {
      const module = menu.module
      const item = menu.$call()
      // https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
      if (typeof item.then == 'function') {
        const temp = this.asMenuItem({
          $loading: true,
          text: 'Loading ...'
        }, module)
        item.then(data => this.items.splice(this.items.indexOf(temp), 1, this.asMenuItem(data, module)))
        return temp
      }
      return this.asMenuItem(item, module)
    })
    
  }
}
</script>
