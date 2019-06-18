<template>
  <div class="container">

    <ul class="list-group list-group-flush">
      <li 
        class="list-group-item flex-container" 
        v-for="post in posts" :key="post.data.id" 
        @click="openImage(post.data.preview.images[0].source.url)"
      >
        <img :src="post.data.thumbnail" alt="thumb" class="thumbnail">
        <div>{{ post.data.title }}</div>
      </li>
    </ul>

    <hr/>

    <div class="row">
      <div class="col-4" v-for="(location, idx) in locations" :key="idx">
        <div class="card" >
          <img :src="location.image" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ location.name }}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go there</a> <span>&nbsp;</span>
            <button @click="deleteLocation(location.id)" class="btn btn-danger"> Delete </button>
          </div>
        </div>
      </div>
    </div>

    <hr/>

    <form @submit="addLocation(name, image)">
      <div class="form-group">
        <label for="name">Location Name</label>
        <input v-model="name" placeholder="Location Name" class="form-control">
      </div>
      <div class="form-group">
        <label for="image">Location Name</label>
        <input v-model="image" placeholder="Location Image URL" class="form-control">
      </div>
      <button type="submit"  class="btn btn-primary">Add New Location</button>
    </form>
  </div>
</template>

<script>
import { db } from '../main'

const axios = require('axios')
const { ipcRenderer } = require("electron")

export default {
  name: 'HelloWorld',
  data() {
    return {
      posts: [],
      locations: []
    }
  },
  firestore () {
    return {
      locations: db.collection('locations').orderBy('createdAt')
    }
  },
  created() {
    axios.get("https://reddit.com/r/aww.json?raw_json=1&limit=6")
      .then(response => {
        this.posts = response.data.data.children
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    addLocation (name, image) {
      const createdAt = new Date()
      db.collection('locations').add({ name, image, createdAt })
    },
    deleteLocation (id) {
      db.collection('locations').doc(id).delete()
    },
    openImage(image) {
      ipcRenderer.send("toggle-image", image)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/*
.list-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.list-group-flush .list-group-item {
  border-right: 0;
  border-left: 0;
  border-radius: 0;
}
.list-group-flush:first-child .list-group-item:first-child {
  border-top: 0;
}
*/
.flex-container {
  display: flex;
  align-items: center;
}
.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 16px;
}
.list-group-item {
  cursor: pointer
}
.list-group-item:hover {
  background-color: #eee;
}
.card {
  margin: 5px;
}

</style>
