<template>
  <div id="app">
    <div id="nav">
    <Header v-bind:info="{URL:URL,token:token}" v-bind:URL="URL" v-bind:loggedIn="loggedIn" @logout="logout" />
    </div>
    <router-view @loggedIn="login($event)"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data:function(){
    return {
      loggedIn: false,
      token: {},   
      URL: 'https://sap4backend.herokuapp.com',
    };
  },
  beforeMount: function() {
       const getLogin = JSON.parse(window.sessionStorage.getItem('login'))
       console.log(getLogin)
       if(getLogin) {
         console.log("created running")
         this.login(getLogin);
       }
    },  
  methods: {
    login: function(event){
      console.log('event heard')
      this.loggedIn = true;
      this.token = event.token;
      this.$router.push({ 
        path: 'Main', 
        query: { token: this.token, URL: this.URL },
      }).catch(()=>{});
      window.sessionStorage.setItem('login', JSON.stringify(event));
    },
    logout: function(){
      this.loggedIn = false;
      this.token = {};
      this.$router.push('/');
      
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

</style>
