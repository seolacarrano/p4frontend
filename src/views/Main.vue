<template>
  <div class="main">

    <b-field label="New Category" type="is-success">
     <b-input id="title_ip" type="text" v-model="title" maxlength="30"></b-input>
    </b-field>
    <b-button type="is-danger" @click="newCategory">Add</b-button><br/><br/>

    <b-field label="Edit Category" type="is-success">
     <b-input id="edit_ip" type="text" v-model="edittitle" maxlength="30"></b-input>
    </b-field>
    <b-button type="is-danger" @click="editCategory" v-bind:id="editid">Edit</b-button><br/><br/>  

    <ul class="all_categories">
      <li v-for="category of categories" v-bind:key="category.id">
        <div class="category_container">
           {{category.title}}
          <button v-bind:id="category.id" class="button is-success is-outlined" @click="deleteCategory">Delete</button>
          <button v-bind:id="category.id" class="button is-success is-outlined" @click="() => {editSelect(category.id, category.title)}">Edit</button>
        </div>  
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
      edittitle: "",
      editid: null
    };
  },
  created: function() {
    this.getCategory();
  },
  methods: {
    newCategory: function() {
      const {token, URL} = this.$route.query;

      fetch(`${URL}/api/categories/`, {
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
    },
    deleteCategory: function(event) {
      const { token, URL } = this.$route.query;
      const id = event.target.id;
      fetch(`${URL}/api/categories/${id}/`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`,
        },
      }).then(() => {
        this.getCategory();
      });
    },
    editSelect: function(id, content){
      this.editid = id
      this.edittitle = content
    },
    editCategory: function() {
      const { token, URL } = this.$route.query;
      const id = this.editid;
      fetch(`${URL}/api/categories/${id}/`, {
        method: "put",
        headers: {
          authorization: `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({title: this.edittitle})
      }).then(() => {
        this.getCategory();
      });
    }
  }
}
</script>

<style>
#title_ip {
  width: 50%;
}

.all_categories {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
}

.category_container{
  height: 150px;
  width: 150px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
}
</style>
