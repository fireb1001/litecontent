<template>
  <section class="litecontent-posts ar-content">
    <h2>مقالات {{store_blog.name}}</h2>
    
    <ul class="list-group list-group-flush">
      <li 
      v-for="(post, idx) in posts.slice().reverse()" :key='idx'
      class="list-group-item " @mouseover="active = idx" @mouseout="active = -1">
      <div >
        <h3 style="display: inline-block;cursor: pointer;" class="post-title" @click="editPost(store_blog.name, post.id)">
          {{post.title}}
          <span v-if="post.draft" class="text-danger"> - Draft</span>
        </h3>
        
        <div style="height: 2em">
          <span v-show="active === idx" >
            <button class="btn btn-blue" type="button" @click="editPost(store_blog.name, post.id)"> تحرير </button>
            <button class="btn btn-blue" type="button" @click="openHref(store_blog.root_settings.baseURL+'post/'+post.slug)"> عرض </button>
            <button class="btn text-danger" type="button" @click="deletePost(post.id)"> 
              <template v-if="! confirm_step[post.id]">حذف</template>
              <template v-if="confirm_step[post.id]"> متأكد ؟ </template>
            </button>
          </span>
        </div>
        
      </div>
      <!--
      <div > 
        <button class="btn btn-primary" type="button" @click="editPost(store_blog.name, post.id)"> Edit </button>
        <button class="btn btn-danger" type="button" @click="deletePost(post.id)">
          <template v-if="! confirm_step[post.id]">Delete Me</template>
          <template v-if="confirm_step[post.id]">Sure ?</template>
        </button>
      </div>
      -->
      </li>
    </ul>

    <h2>Images Posts of {{store_blog.name}}</h2>
    <ul class="row">
      <li 
      v-for="(image, idx) in images.slice().reverse()" :key='idx'
      @mouseover="img_active = idx" @mouseout="img_active = -1"
      class="list-group-item col-4">
      <img :src="image.src" alt="" width="90%">
      
      <div ><b>{{image.caption}}</b></div>
      <div style="height: 2em" > 
        <span v-show="img_active === idx">
          <button class="btn btn-primary" type="button" @click="editImage(image.id)"> Edit </button> 
          <button class="btn btn-danger" type="button" @click="deleteImage(image.id)">
            <template v-if="! confirm_step[image.id]">Delete Me</template>
            <template v-if="confirm_step[image.id]">Sure ?</template>
          </button>
        </span>
      </div>
      </li>
    </ul>

    <div class="container">
      <content-plan class="row col plan" />
    </div>

  </section>
</template>

<script>
import { db } from '../main'
import ContentPlan from '@/components/ContentPlan.vue'

const shell = require('electron').shell

export default {
  name: 'src-components-posts',
  data () {
    return {
      posts: [],
      images: [],
      store_blog: this.$store.state.blog,
      confirm_step: [],
      active: -1,
      img_active: -1
    }
  },
  firestore () {
    return {
      posts: db.collection('posts.'+this.$store.state.blog.name).orderBy('createdAt'),
      images: db.collection('mvision').where("published", "==", true).where("blog", "==", this.$store.state.blog.name).orderBy('createdAt')
    }
  },
  methods: {
    editPost(blog, post_id) {
      // Multi params !
      this.$router.push({name: 'postedit', params: { blog, post_id }})
    },
    openHref( url ) {
      shell.openExternal(url)
    },
    editImage( id ) {
      this.$router.push({name: 'imageEdit', params: { mvision_id: id }})
    },
    deletePost( id ) {
      if( this.confirm_step[id] ) {
        db.collection('posts.'+this.store_blog.name).doc(id).delete()
      }
      else {
        // Always modify arrays by using an Array instance method, or replacing it entirely
        // Or
        // this.$set(this.confirm_step, id, true)
        this.confirm_step = []
        this.confirm_step[id] = true
      }
    },
    deleteImage(id) {
      if( this.confirm_step[id] ) 
        db.collection('mvision').doc(id).delete()
      else 
        this.$set(this.confirm_step, id, true)// fok it
    }
  },
  components: {
    ContentPlan
  },
  props: {
    // blog: Object
  },
  watch: {
    confirm_step(value){
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
.plan {
  background-color: antiquewhite;
  margin: 20px auto;
}
.draft-icon {
  margin: 0 15px;
  font-size: 24px;
  color: red;
}
</style>
