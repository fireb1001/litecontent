<template>
  <section class="blogsdash">
    <li v-for="(nblog, idx) in blogs" :key='idx'>
      <span @click="changeBlog(nblog.id)"> {{nblog.name}} </span> 
    </li>
  </section>
</template>

<script >
import { db } from '../main'

export default {
  name: 'blogsdash',
  data () {
    return { 
      blogs: []
    }
  },
  firestore () {
    return {
      blogs: db.collection('static_blogs').orderBy('createdAt'),
    }
  },
  methods: {
    async changeBlog(blog_ref){
      // this.blog = db.collection('static_blogs').doc(blog_ref).

      db.collection('static_blogs').doc(blog_ref).get().then( snap =>{
        
        let blog = snap.data()
        blog.id = snap.id
        this.$store.commit('setBlog', blog)
        this.$store.commit('setBlogSettings', blog.root_settings)
        localStorage.setItem('blog', JSON.stringify(blog))
        this.$router.push('/')
      })
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">

</style>
