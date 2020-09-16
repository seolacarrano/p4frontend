<template>
  <div class="main">

     <b-field label="New Category" type="is-success">
            <b-input id="title_ip" type="text" v-model="title" maxlength="30"></b-input>
      </b-field>
      <b-button type="is-danger" @click="newCategory">Add</b-button><br/><br/>

    <ul>
      <li v-for="category of categories" v-bind:key="category.id">{{category.title}}
        
      </li>
    </ul>    
  </div>
</template>

<script>


export default {
  name: 'Main',
  data: function(){
    return {
      categories: [],
      title: "",
    };
  },
  created: function() {
    this.getCategory();
  },
  methods: {
    newCategory: function() {
      const {token, URL} = this.$route.query;

      fetch(`${URL}/api/categories`, {
      method: "post",
      headers: {
        authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: this.title }),
    }).then(() => {
       this.getCategory();
    });
   },
   getCategory: function() {
     const {token, URL} = this.$route.query;

     fetch(`${URL}/api/categories`, {
      method: "get",
      headers: {
        authorization: `JWT ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.categories = data;
    });
    }
  }
}
</script>

<style>
#title_ip {
  width: 50%;
}
</style>
