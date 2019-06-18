<template>
  <div id="app" class="row" style="max-width: 90%;padding:10px;margin:10px;">
     <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">LiteContent</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
            <div class="row">
        <sidenav v-if="$store.state.navtrack.showside"/>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-9 px-4">
  <!-- simple comment 
      <div class="col-2">
        <div class="side" >
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/hello">Hello</router-link>
        </div>
      </div>
      -->
    <router-view/>
    </main>
      </div>
  </div>
</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Sidenav from '@/components/Sidenav.vue'
export default {
  mounted () {
    if( ! this.$store.state.blog.id && localStorage.blog ) {
      console.log("localStorage.blog", localStorage.blog)
      this.$store.commit('setBlog', JSON.parse(localStorage.blog))
    }
  },
  components : {
    Sidenav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

pre {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  direction: ltr;
  text-align: left;
}

.side {
background-color: #222;
color: #aaa;
width: 200px;
height: 100%;
position: fixed;
}

.ar-content {
  direction: rtl;
  text-align: right;
}

.keyword {
  margin: 5px;
  padding: 5px;
  background-color: #f7c08e;
  border-radius: 5px;
  display: inline-block;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

.btn-blue {
  color: #007bff;
}
.btn-blue:hover{
  color: #007bff;
}

.post-title:hover{
  color: #007bff;
}
</style>
