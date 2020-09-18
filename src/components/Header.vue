<template>
  <div class="header">
    <b-navbar>
      <template slot="brand">
        
          <img
            src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1600226633/Screen_Shot_2020-09-15_at_11.23.36_PM_zryvfv.png"
            alt="wrong answer note logo" style="width:75px; height:57px;"
          />
     
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          <router-link to="/" id="home">Home</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
        <!-- <router-link to="/Main">Category</router-link> -->
        <router-link :to="{name: 'Main', query: $attrs.info}">Category</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
        <!-- <router-link to="/Note">Note</router-link> -->
        <router-link :to="{name: 'Note', query: $attrs.info}">Note</router-link> 
        </b-navbar-item>
   
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link :to="{name: 'Signup', query: {URL: this.URL}}" v-bind:URL="URL" v-if="!signedUp"><b-button id="signup_btn" type="is-danger">Sign-up</b-button></router-link>  <!--if logged in is not true, show the login button -->
            <router-link :to="{name: 'Login', query: {URL: this.URL}}" v-bind:URL="URL" v-if="!loggedIn"><b-button id="login_btn" type="is-danger">Log in</b-button></router-link>  <!--if logged in is not true, show the login button -->
            <b-button v-if="loggedIn" class="button is-link" @click="logout" type="is-success">Logout</b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['URL', 'loggedIn', 'signedUp'],
  methods: {
    logout: function(){
      this.$emit('logout')
    }
  }
};
</script>

<style>
.header {
  width: 100%;
  margin: 10px auto
}

#signup_btn {
  margin-right: 15px;
}

</style>
