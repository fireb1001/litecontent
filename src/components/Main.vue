<template>
  <section >
      <Blogs/>
  </section>
</template>

<script >
// import { db } from '../main'

const { ipcRenderer, remote } = require("electron")
const { Menu } = remote

import Blogs from '@/components/Blogs.vue'
export default {
  name: 'src-components-main',
  data () {
    return {}
  },
  firestore () {
    return {}
  },
  methods: {
    initMenu() {
      const menu = Menu.buildFromTemplate([
        {
          label: "File",
          submenu: [
            { label: "New Window" },
            {
              label: "Settings",
              accelerator: "CmdOrCtrl+,",
              click: () => {
                ipcRenderer.send("toggle-settings")
              }
            },
            { type: "separator" },
            {
              label: "Quit",
              accelerator: "CmdOrCtrl+Q"
            }
          ]
        },
        {
          label: "Edit",
          submenu: [
            { label: "Menu Item 1" },
            { label: "Menu Item 2" },
            { label: "Menu Item 3" }
          ]
        }
      ]);
      Menu.setApplicationMenu(menu)
    }
  },
  components: {
    Blogs
  }
}
</script>

<style >

</style>
