<template>
  <section class="src-views-blog-pages">
    <h1>Blog Authors</h1>

    <div v-for="(author, id) in store_blog.authors" :key="id">
      {{author}}
    </div>

    <h1>Blog Pages</h1>

    <div v-for="(page, id) in store_blog.pages" :key="id">
      {{page}}
    </div>
  </section>
</template>

<script >
// import { db } from '../main'

export default {
  name: 'src-views-blog-pages',
  data () {
    return {
      store_blog: this.$store.state.blog
    }
  },
  firestore () {
    return {}
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped lang="scss">

</style>
