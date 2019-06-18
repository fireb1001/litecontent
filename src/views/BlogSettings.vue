<template>
  <section class="src-views-blog-settings">
    <h1> {{store_blog.name}} settings page</h1>
    <pre>{{blog}}</pre>
    {{static_settings}}
    <hr/>
    <div v-for="(item, idx) in blog.root_settings" :key="idx" @click="editProp= idx; editPropVal= item; inColl='root_settings'">
      {{idx}} : {{ item }}
    </div>
    <hr/>
    <div v-for="(item, idx) in blog.theme_params" :key="idx" @click="editProp= idx; editPropVal= item; inColl='theme_params'">
      {{idx}} : {{ item }}
    </div>
    <hr/>
    <edit-prop :item="editProp" :value="editPropVal" :coll='inColl' @saved="propSaved"/>
    <br/>
    <button class="btn btn-primary" type="button" @click="createRootSettings()"> Reset Root Settings </button>
  </section>
</template>

<script>
import { db } from '../main'
import EditProp from '@/components/EditProp.vue'

export default {
  data () {
    return {
      store_blog: this.$store.state.blog,
      blog: {},
      editProp: null,
      editPropVal: null,
      inColl:null,
      static_settings: {}
    }
  },
  firestore () {
    return {
      blog: db.collection('static_blogs').doc(this.store_blog.id),
      static_settings: db.collection('static_blog_settings').doc(this.store_blog.type)
    }
  },
  methods: {
    propSaved(editProp) {
      let mapIn = this.blog[editProp.coll]
      mapIn[editProp.prop] = editProp.val
      this.saveBlog()
    },
    createRootSettings() {
      let new_root_settings = this.static_settings.root_settings ? this.static_settings.root_settings : {}
      if(this.blog.type == 'hugo') {
        new_root_settings.baseURL = "https://"+ this.blog.name+ "/"
      }
      this.blog.root_settings = new_root_settings
      let theme = this.blog.root_settings['theme']
      this.blog.theme_params = this.static_settings[theme+'.params']
      this.saveBlog()
    },
    saveBlog(){
      db.collection('static_blogs').doc(this.store_blog.id).update(this.blog)
    }
  },
  components: {
    EditProp
  }
}
</script>

<style scoped lang="scss">

</style>
