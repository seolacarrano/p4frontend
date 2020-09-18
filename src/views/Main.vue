<template>
  <div class="main">
    
    <div class="new_category">
    <p id="title_msg"> Add a New Category</p>
    <b-input id="title_ip" type="text" v-model="title" maxlength="30"></b-input>
    <b-button id="title_btn" type="is-danger" @click="newCategory">Add</b-button><br/><br/>
    </div>

    <!-- <b-field label="Edit Category" type="is-success">
     <b-input id="edit_ip" type="text" v-model="edittitle" maxlength="30"></b-input>
    </b-field>
    <b-button type="is-danger" @click="editCategory" v-bind:id="editid">Edit</b-button><br/><br/>   -->

    <ul class="all_categories">
      <li v-for="category of categories" v-bind:key="category.id">
          <div class="category_container">
            <router-link :to="{name: 'Note', query: $route.query, params:{categoryid: category.id}}"><div id="category_name"> {{category.title}} </div></router-link>
          
          <!----button for note page----->
          <!-- <router-link :to="{name: 'Note', query: $route.query, params:{categoryid: category.id}}"><b-button type="is-success">note</b-button></router-link>  -->
          
          <!--------dropddown---------->
          <b-dropdown id="category_dropdown" aria-role="list">
              <b-button type="is-success" slot="trigger" slot-scope="{ active }">
                  <span id="category_btn_span">•••</span>
                  <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
              </b-button>
              
              <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="edit_btn" v-on:click="isActive = !isActive" @click="() => {editSelect(category.id, category.title)}">Edit</button></b-dropdown-item>                                    
              <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="del_btn" @click="deleteCategory">Delete</button></b-dropdown-item>
          </b-dropdown>

          <!-------toggle------->
          <div class="category_toggle">
          <b-message title="Edit Category"  v-model="isActive" aria-close-label="Close message">
              <b-input id="edit_ip" type="text" v-model="edittitle" maxlength="30"></b-input>        
              <b-button type="is-danger" @click="editCategory" v-bind:id="editid">Edit</b-button> 
          </b-message>
          </div>
          
          

            <!-- <button v-bind:id="category.id" class="button is-success is-outlined" @click="deleteCategory">Delete</button> -->
            <!-- <button v-bind:id="category.id" class="button is-success is-outlined" @click="() => {editSelect(category.id, category.title)}">Edit</button> -->
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
      editid: null,
      isActive: false,
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

#title_msg {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.5rem;
}

#title_ip, #title_btn {
  margin-top: 15px;
}

#title_ip, #edit_ip {
  width: 50%;
}

.all_categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: 'Ubuntu', sans-serif;
  font-size: large;
  margin-top: 20px;
}

.category_container {
  height: 150px;
  width: 150px;
  padding-top: 2rem;
  padding-bottom: 9rem;
  margin-left: 5rem;
  margin-right: 5rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #42b983;
  border-radius: 8px;
  /* background-image: url("https://res.cloudinary.com/dqduwnrb1/image/upload/v1600310362/coding_asvhd8.jpg"); */
  font-family: 'Ubuntu', sans-serif;
  color: red;
}

#category_name{
  text-decoration: none;
  padding-bottom: 1rem;
}

#category_dropdown {
  padding-top: 0.5rem;
}

.edit_btn {
  padding-left: 1rem;
  padding-right: 0.9rem;
}

.del_btn {
  padding-left: 1rem;
  padding-right: 1rem;
}

.del_btn, .edit_btn {
  margin-left: 3rem;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
}

/* #category_button {
  width: 50%;
  height: 50%;
} */

#category_btn_span {
  text-align: center;
  margin-left: 15px;
}

.category_toggle {
  width: 200px;
  height: 50px;
}

#edit_ip {
  width: 80%;
}
</style>
