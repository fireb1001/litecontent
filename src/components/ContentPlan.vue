<template>
  <section class="src-components-content-plan">
    <h1>Content Plan</h1> 
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Keyword</th>
      <th scope="col">VOL</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, idx) in keywords" :key='idx'>
      <td >
        <span @click="show_item(item)"> {{item.keyword}} </span>
        <span class="linky" @click="shell.openExternal('https://www.google.com/search?q='+item.keyword)">
          <span class="fas fa-search"></span>
        </span>
      </td>
      <td>{{item.m_vol}}</td>
      <td>
        <button class="btn btn-primary" type="button" @click="new_post(item)">Create New Post</button>
        <button class="btn btn-danger" type="button" @click="deletePlannedPost(item.id)" v-if="manage">
          <template v-if="! confirm_step[item.id]">Delete </template>
          <template v-if="confirm_step[item.id]">Sure ?</template>
        </button>
      </td>
    </tr>
  </tbody>

  <button class="btn btn-primary" type="button" @click="new_post({keyword:'New You'})">Create New Post</button>
</table>

  </section>
</template>

<script >
import { db } from '../main'
var moment = require('moment')
const shell = require('electron').shell
var marked = require('marked')

export default {
  name: 'content-plan',
  data () {
    return {
      keywords: [],
      confirm_step: [],
      store_blog: this.$store.state.blog,
      shell: shell
    }
  },
  firestore () {
    return {
      // TODO blog id as a parameter
      keywords: db.collection('static_blogs/'+this.store_blog.id+'/content_plan')
    }
  },
  props : ['manage'],
  methods: {
    new_post(item) {
      let outlines_arr = item.notes ? marked.lexer(item.notes).filter(item => item.type === 'text') : []
      let outlines_mds = []
      outlines_arr.forEach(item => {
        outlines_mds.push( {content: '## '+ item.text, type: 'md'})
      })
      var format_date = moment().format('YYYY-MM-DD')
      let post = {
        title: item.keyword,
        slug: item.keyword.replace(/ /g, '-'),
        md_contents: outlines_mds,
        front_matter:{date: format_date, author:'',cover:''},
        createdAt: new Date(),
        draft: true
      }
      // console.log(post)
      db.collection('posts.'+ this.store_blog.name).add(post)
    },
    show_item(item) {
      this.$emit('show_item',item)
    },
    deletePlannedPost(id) {
      if( this.confirm_step[id] ) {
        db.collection('static_blogs/'+this.store_blog.id+'/content_plan').doc(id).delete()
      }
      else {
        this.confirm_step = []
        this.confirm_step[id] = true
      }
    }
  },
  components: {
  }
}
</script>
