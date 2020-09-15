<template>
  <div class="main">
    <ul>
      <li v-for="category of categories" v-bind:key="category.id">{{category.title}}</li>
    </ul>    
  </div>
</template>

<script>


export default {
  name: 'Main',
  data: function(){
    return {
      categories: []
    }
  },
  created: function(){
    const {token, URL} = this.$route.query
    fetch(`${URL}/api/categories`, {
      method: 'get',
      headers: {
        authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.categories = data
    })
  }
}
</script>

