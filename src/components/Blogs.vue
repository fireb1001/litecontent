<template>
  <section class="src-components-blogs">

    <Posts v-if="$store.state.blog.name"/>
  </section>
</template>

<script >
// import { db } from '../main'
import Posts from '@/components/Posts.vue'
export default {
  name: 'src-components-blogs',
  data () {
    return { blog: {}}
  },
  firestore () {
    // TODO Select current static blog
    return {
      // blog: db.collection('static_blogs').doc('tHF4t6ZEXTIVA8fUxVgK')
    }
  },
  mounted () {
    this.$store.commit('togSide', true)
  },
  methods: {
    
  },
  components: {
    Posts
  }
}
</script>
