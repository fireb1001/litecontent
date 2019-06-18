<template>
  <section class="image-edit ar-content">
    <h1>{{image.caption}}</h1>
    <router-link class="nav-link" to="/">Home</router-link>
    <a @click="$router.go(-1)">Go back</a>
    <!-- DEBUG -->
    <pre v-if="true" >
      {{this.$route.params.mvision_id}}
      {{image}}</pre>
    <div>
      <img :src="image.src"/>
    </div>
    
    <div>
      <b>Alt</b> {{image.alt}}
    </div>
    
    <div>
      <b>Content</b>
      <p @click="edit_mode = true " class="edit" v-show="! edit_mode" v-html="$options.filters.marked_down(image.content)"></p>
      <div v-show="edit_mode">
        <textarea class="form-control"
        id="editMdContent" v-model="image.content" rows="3"></textarea>
        <div>
          <span class="keyword" v-for='(keyword, index) in image.keywords'
            @click="add_content_kw( keyword )" :key='index'> {{keyword}} </span>
        </div>
          <button type="button" class="btn btn-primary" 
          @click="edit_mode =false;saveImage()">
            <span class="fas fa-check"></span>
          </button> 
      </div>
    </div>
    <br/>
    <button class="btn btn-primary" 
    v-bind:class="{ 'btn-success': ! image.published}"
    type="button" @click="publish()">Publish</button>
  </section>
</template>

<script>
import { db } from '../main'

export default {
  name: 'src-components-image-edit',
  data () {
    return {
      image: {},
      edit_mode: false
    }
  },
  firestore () {
    return {
      image: db.collection('mvision').doc(this.$route.params.mvision_id)
    }
  },
  methods: {
    saveImage(){
      if(! this.image.content)
        this.image.content = ''
      db.collection('mvision').doc(this.$route.params.mvision_id).update(this.image)
    },
    add_content_kw(keyword) {
      let space = this.image.content ? ' ':''
      this.image.content = this.image.content ? this.image.content.trim() : ''
      this.image.content += space+ keyword
    },
    publish(){
      this.image.published= true;
      var postRef = db.collection('posts.'+ this.image.blog ).doc(this.image.parent.ref)
      // update published item
      postRef.get().then(doc=>{
        /** @type {array} */
        let md_contents = doc.data().md_contents
        let image = md_contents.find(element =>{
          return element.slug == this.image.slug
        })
        image.published = true
        postRef.update({md_contents: md_contents})
      })
      this.saveImage()
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
img {
  display: block;
  max-width: 50%;
}
div {
  margin: 15px;
}
.publish {
  display: block;
}
p.edit {
  min-height: 2em;
  border: crimson 1px dashed;
  border-radius: 10px;
  padding: 15px;
}
</style>
