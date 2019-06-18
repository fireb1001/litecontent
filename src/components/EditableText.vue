<template>
  <section class="editable-text-vue">
    <span @click="editing=true" v-show="!editing">
      {{value}}
      <span class="fa fa-edit"></span>
    </span>
    <span v-show="editing" >
      <input :value="value"
             @input="$emit('input', $event.target.value)"
             @keydown.enter="editing=false;$emit('save')"
             type="text" 
             class="form-control" >
    </span>
    <button v-show="editing" type="button" class="btn btn-primary" 
    @click="editing=false;$emit('save')">
      <span class="fas fa-check"></span>
    </button>
  </section>
</template>

<script >

export default {
  name: 'editable-text',
  data () {
    return {
      editing: false,
    }
  },
  methods: {
  },
  components: {
  },
  props: ['value']
}
</script>

