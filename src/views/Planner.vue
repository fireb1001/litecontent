<template>
  <section class="src-views-planner">
    <content-plan class="row col plan" :manage="true" @show_item="show_plan"/>

    <div v-if="show_item" class="ar-content">
      <h3 @click="copy(show_item.keyword)">{{show_item.keyword}}</h3>
      <textarea class="form-control" rows="5" v-model="show_item.notes"></textarea>
      <br/>
      <button type="button" class="btn btn-danger" @click="show_item=null">Cancel</button>
      <button type="button" class="btn btn-primary" @click="save_plan(show_item)">Save</button>
    </div>
    <hr/>
    <b-form @submit="addPlannedPost" class="custom_form">
      <b-form-group :label="'Keyword'" >
        <b-form-input v-model="form.keyword">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Monthly Searches" >
        <b-form-input v-model="form.m_vol">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>

  </section>
</template>

<script >
import { db } from '../main'
import ContentPlan from '@/components/ContentPlan.vue'
const { clipboard } = require('electron')

let init_form = {
  keyword:'',
  m_vol: 0
}
export default {
  name: 'src-views-planner',
  data () {
    return {
      confirm_step : [],
      form: Object.assign({}, init_form),
      show_item: null,
      store_blog: this.$store.state.blog
    }
  },
  firestore () {
    return {}
  },
  methods: {
    show_plan(item) {
      this.show_item = item
    },
    copy( text ) {
      clipboard.writeText(text)
    },
    addPlannedPost(evt) {
      evt.preventDefault()
      db.collection('static_blogs/'+this.store_blog.id+'/content_plan').add({
        keyword: this.form.keyword,
        m_vol: this.form.m_vol
      })
      console.log("init_form", init_form)
      this.form= Object.assign({}, init_form)
    },
    save_plan(plan) {
      db.collection('static_blogs/'+this.store_blog.id+'/content_plan')
      .doc(plan.id).update(this.show_item).then( ()=> this.show_item=null )
    }
  },
  components: {
    ContentPlan
  }
}
</script>
