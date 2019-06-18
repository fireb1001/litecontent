<template>
  <b-form @submit="submitForm" class="custom_form">
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
// TODO https://blog.rangle.io/how-to-create-data-driven-user-interfaces-in-vue/
export default {
  name: 'custom-form',
  data () {
    return {
      editableVal: this.value
    }
  },
  firestore () {
    return {}
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault()
      this.$emit('submit',{coll: this.coll, prop:this.item, val:this.editableVal})
    }
  },
  components: {
  },
  watch: {
    /*
    value ( new_val ) {
      new_val = new_val ? new_val : ''
      console.log('value _changed ', new_val )
      this.editableVal = new_val
    }
    */
  },
  props: ['formObj']
}
</script>

<style scoped lang="scss">

.custom_form {
  margin: 20px auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #e3eaea;
}

</style>