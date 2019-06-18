<template>
  <div >
    <img :src="imageUrl" style="max-width: 100%" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  created() {
    ipcRenderer.on('image', (event, args) => {
      this.imageUrl = args
    })
  },
  data() {
    return {
      imageUrl: ''
    }
  }
}
</script>
