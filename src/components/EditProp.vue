<template>
  <b-form @submit="setPropValue" class="post_prop_form">
    <b-form-group :label="'Edit '+ item+ ' in '+ coll+ ' collection'" >
      <b-form-input v-model="item">
      </b-form-input>
    </b-form-group>

    <b-form-group label="Set Value" >
      <b-form-input v-model="editableVal">
      </b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Save</b-button>
  </b-form>
</template>

<script>

export default {
  name: 'edit-prop',
  data () {
    return {
      editableVal: this.value
    }
  },
  firestore () {
    return {}
  },
  methods: {
    setPropValue(evt) {
      evt.preventDefault()
      this.$emit('saved',{coll: this.coll, prop:this.item, val:this.editableVal})
    }
  },
  components: {
  },
  watch: {
    value ( new_val ) {
      new_val = new_val ? new_val : ''
      console.log('value _changed ', new_val )
      this.editableVal = new_val
    }
  },
  props: ['item','value','coll']
}
</script>

<style scoped lang="scss">

.post_prop_form {
  margin: 20px auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #e3eaea;
}

</style>