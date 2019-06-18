<template>
    <div class="container">
        <input class="hide" type="file" name="image" id="image" ref="file" v-on:change="fileInputChange"/>
        <div @click="onFileDial" class="photo-add" v-if="! uploading">
            <span class="fas fa-upload fa-3x"></span>
            <span style="display:block"> Upload A Photo </span>
        </div>
        <div v-if="uploading" style="margin:10px auto;text-align: center">
          <img style="width: 70px;height:70px;" src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" alt="spinners">
        </div>
        <hr/>
        <div class="row">
          <input type="text" class="form-control" placeholder="File Name" v-model="file_name">
        </div>
        <hr/>
        <div class="row">
          <input type="text" class="form-control" placeholder="File url" v-model="file_url">
        </div>
        <div class="row upload-btn">
          <button type="button" class="btn btn-primary " @click="fileInputUrl">Upload from url</button>
        </div>

    </div>
</template>

<script>
import { storage } from '../main'
const axios = require('axios')

export default {
  data () {
    return {
      uploading: false,
      file_url: '',
      file_name: ''
    }
  },
  props: {
    directory: {
      type: String
      // , required: true
    }
  },
  methods: {
    onFileDial () {
      this.$refs.file.click()
    },
    storageUpload (file, meta) {
      // Get Extension from type !
      var extension = ''
      switch (file.type) {
        case 'image/jpeg' :
          extension = '.jpg'
          break
        case 'image/png' :
          extension = '.png'
          break
      }
      var slug = (this.file_name) ? this.file_name.replace(/ /g, '-') + '-'+ Date.now() : Date.now()
      var keywords = (this.file_name) ? this.file_name.replace(/ /g, ',') : ''
      var directory = (this.directory)? this.directory +'/' : ''
      var metaData = {customMetadata: {width: meta.width, height: meta.height}}
      storage.child(directory + slug + extension).put(file, metaData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log('File available at', downloadURL)
          var uploadedImg = {
            src: downloadURL,
            type: 'image',
            width: meta.width,
            height: meta.height,
            slug: slug,
            alt: this.file_name,
            keywords: keywords,
            caption: ''
          }
          this.$emit('uploaded', uploadedImg)
          // RESET
          this.uploading = false
          this.file_name = ''
        })
      })
    },
    getImageMeta (file) {
      var reader = new FileReader()
      var img = new Image()
      return new Promise((resolve) => {
        reader.onload = function () {
          img.onload = function () {
            resolve(img)
          }
          img.src = reader.result
        }
        reader.readAsDataURL(file)
      })
    },
    fileInputChange (event) {
      const file = event.target.files[0]
      let file_name = file.name.split('.').slice(0, -1).join('.')
      this.file_name = file_name.replace(/-/g, ' ')
      this.uploading = true
      this.getImageMeta(file).then(img => {
        console.log(img)
        this.storageUpload(file, {width: img.width, height: img.height})
        this.$refs.file.value = '' // reset file input
      })
    },
    fileInputUrl () {
      // Use https://cors-anywhere.herokuapp.com/ as proxy
      var corsproxy = '' ; // 'https://cors-anywhere.herokuapp.com/'
      axios
        .get(`${corsproxy}${this.file_url}`, {
          responseType: 'blob'
        })
        .then(response => {
          var blobfile = response.data
          this.getImageMeta(blobfile).then(img => {
            this.storageUpload(blobfile, {width: img.width, height: img.height})
            this.file_url = ''
          })
        })
        .catch(error => { console.log(error) })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
    margin: 20px;
    padding: 20px;
    text-align: center;
}
.upload-btn {
  margin: 10px auto;
  text-align: center;
  justify-content: center;
}
.hide {
  display: none;
}
.photo-add {
    margin: 20px;
    border-style: dashed;
    padding: 20px;
    border-color: gray;
    justify-content: center;
    text-align: center;
    font-weight: bold;
}
</style>
