<template>
<div class="row">
  <section class="post-edit-side col-3">

    <h3> Post Slug </h3>
    <editable-text v-model="post.slug" v-on:save="savePost()"></editable-text>
    <hr/>
    <h3> To Publish </h3>
    <div >
      <input type="radio" v-model="post.draft" id="exampleRadios1" :value="true">
      <label for="exampleRadios1">
        Is Draft
      </label>
    </div>
    <div >
      <input type="radio" v-model="post.draft" id="exampleRadios2" :value="false">
      <label for="exampleRadios2">
        To Publish
      </label>
    </div>
    Draft : {{post.draft}}
    <hr/>
    <h3>Post Front Matter</h3>
    <!--
    <div class="side" >
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/hello">Hello</router-link>
    </div>
    -->
    <div class="fm_items_container" v-if="post.front_matter">
      <div class="fm_item cover">
        <b>Cover: </b>
        <img :src="post.front_matter.cover" alt="" style="max-width:100%">
      </div>

      <div class="fm_item">
        <b @click="prop_item='author';prop_value= post.front_matter.author">Author: </b><span>{{post.front_matter.author}}</span>
      </div>

      <div class="fm_item">
        <b @click="prop_item='date';prop_value= post.front_matter.date">date: </b><span>{{post.front_matter.date}}</span>
      </div>

      <div class="fm_item">
        <b @click="prop_item='description';prop_value= post.front_matter.description">description: </b><span>{{post.front_matter.description}}</span>
      </div>

    </div>
<!--
    <b-form @submit="setPostProp" class="post_prop_form">
      <b-form-group label="Front Property Name" >
        <b-form-input v-model="form.prop_name">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Front Property Value" >
        <b-form-input v-model="form.prop_value">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Set Property</b-button>
    </b-form>
-->
<edit-prop :item="prop_item" :value="prop_value" :coll='in_coll' @saved="propSaved"/>

  </section>
  <section class="ar-content col-9">
    <router-link class="nav-link" to="/">Home</router-link>
    <span v-if="post.draft" class="fas fa-file-signature draft-icon"> Draft </span>
    <editable-text class="post-title" v-model="post.title" v-on:save="savePost();title_changed=true"></editable-text>
    
    <button type="button" v-if="title_changed" class="btn btn-danger" @click="changeSlug(post.title)">
      <span class="fas fa-ankh"></span> Change Slug
    </button>


    <!-- DEBUG 
    <pre v-if="true" >{{post}}</pre>
    -->
    <!--- diff types as a diff components ! -->
    <draggable class="md_contents" @update="sorted()" :options="{handle : '.dragme'}" v-model="post.md_contents">
      <div v-for="(item, idx) in post.md_contents" :key='idx' class="md_item">
        <div class="single_content" >
          
          <span class="dragme fa fa-sort"></span>

          <div v-if="item.type ==='image'" class="row">
            <div class="col-4" >
              <img :src="item.src" alt="" style="max-width:100%"/>
            </div>
            <div class="col-8">

              <input type="text" class="form-control" 
              @click="img_focus = 'alt';edit_index = idx ;edit_MDContentItem(idx)" 
              v-bind:class="{ img_input_focus: img_focus ==='alt' &&  edit_index === idx}"
              placeholder="Alt Text Here !" v-model="item.alt">

              <input type="text" class="form-control" 
              @click="img_focus = 'caption';edit_index = idx ;edit_MDContentItem(idx)" 
              v-bind:class="{ img_input_focus: img_focus ==='caption' &&  edit_index === idx}"
              placeholder="Title Text Here !" v-model="item.caption">
              <br/>
              web_match_pages_count: {{item.web_match_pages_count}}        
              <br/>
              <!-- image processing -->
              <div v-if="edit_index === idx">
                <span class="keyword" v-for='(keyword, index) in keywords_arr'
                @click="add_kw_to_photo(item, keyword)" :key='index'> {{keyword}} </span>
              </div>

              <div v-if="edit_index === idx" >
                <button type="button" class="btn btn-success" 
                @click="edit_index = -1 ;img_focus='';savePost()">
                  <span class="fas fa-check"></span>
                </button>
                <br/><br/>
              </div>
              
              <span>
                <button type="button" class="btn btn-danger" 
                @click="setCover(item.src);$delete(post.md_contents, idx);savePost()">
                  <span class="fas fa-ankh"></span> Set Cover
                </button>
                &nbsp;
              </span>


              <button v-if="item.published && ! item.linked" 
              type="button" class="btn btn-success" 
              @click="item.linked = true;savePost()">
                <span class="fas fa-link"></span>
              </button>

              <button v-if="item.linked" 
              type="button" class="btn btn-danger" 
              @click="item.linked = false;savePost()">
                <span class="fas fa-unlink"></span>
              </button>

              &nbsp;

              <button v-if="item.mvision_ref && item.tr_keywords" 
              type="button" class="btn btn-primary" 
              @click="doImagePage(idx)">
                <span class="fas fa-hat-wizard"></span>
              </button>

              &nbsp;

              <button
              type="button" class="btn btn-danger"
              @click="$delete(post.md_contents, idx);savePost()">
                <span class="fas fa-trash-alt"></span>
              </button>
            </div>
          </div>
          
          <div v-if="item.type ==='md'">
            <p @click="edit_index = idx ;edit_MDContentItem(idx)" 
            v-show="edit_index !== idx" 
            v-html="$options.filters.marked_down(item.content)"></p>
            <textarea v-show="edit_index === idx" class="form-control" id="editMdContent" v-model="item.content" rows="3"></textarea>
              <button v-if="edit_index === idx" 
              type="button" class="btn btn-success" 
              @click="edit_index = -1 ;savePost()">
                <span class="fas fa-check"></span>
              </button>
          </div>
        </div>

      </div>
      
    </draggable>
    <hr>
    <h3>Add a paragrapgh</h3>
    <textarea class="form-control" id="newMdContent" v-model="newMdContent" rows="4"></textarea>

    <div v-if="newMdContent">
      <br/>
    <button type="button" 
    class="btn btn-primary"
    @click="addMDContent()">Add MarkDown Content</button>
    </div>
    <hr/>
    <!--  <textarea class="stackmd" v-model="post.md_content"></textarea> <span @click="editMD()">editMD</span>-->
    <div>
      <h3>Add an image</h3>
      <PhotosUploader class="uploader"
        :directory="$route.params.blog"
        @uploaded="uploaded"
      />
    </div>
  </section>
</div>
</template>

<script >
import { db, realt_db } from '../main'

import Stackedit from 'stackedit-js';
import PhotosUploader from '@/components/PhotosUploader.vue'
import EditableText from '@/components/EditableText.vue'
import EditProp from '@/components/EditProp.vue'
import draggable from 'vuedraggable'

const stackedit = new Stackedit();

export default {
  name: 'src-components-post-edit',
  data () {
    return {
      post: {md_contents:[], front_matter:[] },
      prop_item: '',
      prop_value: '',
      in_coll: '',
      newMdContent: '',
      img_focus: '',
      edit_index: -1,
      title_changed: false,
      keywords: new Set(),
      keywords_arr: []
    }
  },
  firestore () {
    return {
      post: db.collection('posts.'+ this.$route.params.blog ).doc(this.$route.params.post_id)
    }
  },
  mounted() {
    this.$store.commit('togSide', false)
  },
  methods: {
    /*
    setPostProp(evt) {
      evt.preventDefault()
      if(this.form.prop_name) {
        if(!this.post.front_matter){
          this.post.front_matter = {}
          this.savePost()
        }

        this.post.front_matter[this.form.prop_name]=this.form.prop_value
        this.savePost()

        this.form.prop_name = ''
        this.form.prop_value = ''
      }
    },
    */
    propSaved(editProp) {
      /*
      let mapIn = this.blog[editProp.coll]
      mapIn[editProp.prop] = editProp.val
      */
      this.post.front_matter[editProp.prop] = editProp.val
      this.savePost()
      this.prop_item = ''
      this.prop_value = ''
    },
    setCover(src) {
      this.post.front_matter.cover = src
    },
    add_kw_to_photo(photo_item, keyword){
      let space = photo_item[this.img_focus] ? ' ':''

      photo_item[this.img_focus] = photo_item[this.img_focus] ? photo_item[this.img_focus].trim() : ''
      photo_item[this.img_focus] += space+ keyword
    },
    doImagePage(index) {
      if(this.post.md_contents[index].mvision_ref && this.post.md_contents[index].tr_keywords ) {
        this.saveMVisionImage(this.post.md_contents[index]).then( () =>{
          this.post.md_contents[index].has_image_page = true
          this.savePost()
          this.$router.push({name: 'imageEdit', params: { mvision_id: this.post.md_contents[index].mvision_ref }})
        })
      }
    },
    createImageVision(index) {
      let new_image = this.post.md_contents[index]
      console.log(new_image)
      delete(new_image.edit_mode)
      new_image.blog = this.$route.params.blog
      new_image.createdAt = new Date()
      db.collection('mvision').add(new_image).then(doc_ref => {
        this.post.md_contents[index].mvision_ref = doc_ref.id
        this.savePost()
      })
    },
    sorted() {
      this.savePost()
    },
    changeSlug (title) {
      this.post.slug = title.replace(/ +/g,'-')
      this.savePost()
    },
    savePost() {
      db.collection('posts.'+ this.$route.params.blog ).doc(this.$route.params.post_id).update(this.post)
    },
    saveMVisionImage( image ) {
      let parent_data = this.post.front_matter
      parent_data.ref = this.$route.params.post_id
      parent_data.slug = this.post.slug
      parent_data.title = this.post.title

      return db.collection('mvision').doc(image.mvision_ref).update({
        alt: image.alt,
        caption: image.caption,
        keywords: image.tr_keywords,
        parent: parent_data,
        front_matter: {}
      })
    },
    uploaded (image) {
      let length = this.post.md_contents.push(image)
      this.savePost()
      this.createImageVision(length - 1)
      /*
      this.blogpost.photos.push({path: image.path,
        default: false,
        alt: this.alt_filename,
        title: '',
        type: this.photo_type,
        width: image.width,
        height: image.height
      })
      this.savePost()
      this.alt_filename = ''
      */
    },
    addMDContent() {
      if(! this.post.md_contents)
        this.post.md_contents = []
      
      this.post.md_contents.push({type:'md', content: this.newMdContent})
      this.newMdContent = ''
      this.savePost()
    },
    edit_MDContentItem(index) {
      console.log("edit_MDContentItem",this.post.md_contents[index])
      let current_item = this.post.md_contents[index]
      if(current_item.type === 'md') {
        this.post.md_contents[index].edit_mode = true
      }
      else if (current_item.type === 'image') {
        if(! current_item.alt) {
          current_item.alt = ''
        }
        this.resetImageKeywords()
        this.setImageKeywords(current_item.keywords)
        this.setImageKeywords(current_item.caption)
        this.setImageKeywords(current_item.alt)

        // this.saveMVisionImage(current_item, this.keywords_arr)
        if(current_item.tr_keywords) {
          this.keywords_arr = current_item.tr_keywords
        }
        else {
          realt_db.ref('vision/'+current_item.mvision_ref).once('value').then(snap =>{
            if(snap.val() && snap.val().translation){
              this.setImageKeywords(snap.val().translation)
              this.post.md_contents[index].tr_keywords = this.keywords_arr
              this.post.md_contents[index].web_match_pages_count = snap.val().data.web_match_pages_count
              this.savePost()
            }
          })
        }
      }
    },
    setImageKeywords(text ){
      text = text.replace(/ /g, ',').replace(/-/g, ',')
      let add_kws = text.split(',')
      //console.log(add_kws)
      add_kws.forEach( entry =>{
        this.keywords.add(entry)
      })
      this.keywords_arr = [...this.keywords]
    },
    resetImageKeywords() {
      this.keywords = new Set()
      this.setImageKeywords(this.post.title)
    },
    // removeContetItem(item){ console.log(item) },
    editMD () {
      const el = document.querySelector('.stackmd');
      // Open the iframe
      stackedit.openFile({
        name: 'Filename', // with an optional filename
        content: {
          text: el.value // and the Markdown content.
        }
      });

      // Listen to StackEdit events and apply the changes to the textarea.
      stackedit.on('fileChange', (file) => {
        var md_content =  file.content.text
        el.value = md_content
        this.post.md_content = md_content
      });
    }
  },
  components: {
    PhotosUploader,
    draggable,
    EditProp,
    EditableText
  },
  watch: {
    "post.draft" () {
      this.savePost()
    }
  }
}
</script>

<style scoped lang="scss">
.post-title{
  display: block;
  font-size: 2em;
  font-weight: bold;
}
.row {
  width: 100%;
}
.dragme {
  position: relative;
  right: -30px;
}
.md_item {
  border: solid 1px #bee;
  padding: 10px;
  margin: 10px;
}
.md_item img {
  max-width: 400px;
}
.form-control{
  margin: 5px;
}
.uploader {
  background-color: rgb(245, 230, 230);
}
.fm_item{
  padding: 5px;
  margin: 10px auto;
  border: solid 1px #bee;
  border-radius: 5px;
}
.img_input_focus {
  border: #ded935 3px solid;
}
</style>
