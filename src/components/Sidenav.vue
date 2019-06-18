<template>
  <nav class="col-md-3 d-none d-md-block bg-light sidebar">
  <div class="sidebar-sticky">
    <ul class="nav flex-column">

      <li class="nav-item">
        <a class="nav-link active" href="#">
          <span data-feather="home"></span>
          Dashboard of <span class="sr-only">(current)</span> {{ getBlog.name }}
        </a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/">
        <span class="fa fa-home"></span>
        Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/blogsdash">
        <span class="fa fa-exchange-alt"></span>
        Change Blog
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/blogsettings">
        <span class="fa fa-cog"></span>
        Settings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/blogpages">
        <span class="fa fa-newspaper"></span>
        Blog Pages
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/planner">
          <span class="fa fa-map"></span>
          Content Planner
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="layers"></span>
          Integrations
        </a>
      </li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>Saved reports</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Current month
        </a>
      </li>
    </ul>
  </div>
  </nav>
</template>

<script >
// import { db } from '../main'

export default {
  name: 'sidenav',
  data () {
    return {}
  },
  firestore () {
    return {}
  },
  computed: {
    getBlog() {
      return this.$store.state.blog;
    },
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped lang="scss">

</style>
