<template>
  <div class="main">

    <b-field label="New Category" type="is-success">
     <b-input id="title_ip" type="text" v-model="title" maxlength="30"></b-input>
    </b-field>
    <b-button type="is-danger" @click="newCategory">Add</b-button><br/><br/>

    <!-- <b-field label="Edit Category" type="is-success">
     <b-input id="edit_ip" type="text" v-model="edittitle" maxlength="30"></b-input>
    </b-field>
    <b-button type="is-danger" @click="editCategory" v-bind:id="editid">Edit</b-button><br/><br/>   -->

    <ul class="all_categories">
      <li v-for="category of categories" v-bind:key="category.id">
        <div class="category_container">
           {{category.title}}
        
        <!-- ------dropddown-------- -->
        <b-dropdown aria-role="list">
            <b-button id="category_button" type="is-success" slot="trigger" slot-scope="{ active }">
                <span id="category_btn_span">•••</span>
                <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
            </b-button>

            <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="button is-success is-outlined" v-on:click="isActive = !isActive" @click="() => {editSelect(category.id, category.title)}">Edit</button></b-dropdown-item>                                    
            <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="button is-success is-outlined" @click="deleteCategory">Delete</button></b-dropdown-item>
        </b-dropdown>

        <!-- ----- toggle ------ -->
        <div>
        <b-message title="Default" class="category_toggle" v-model="isActive" aria-close-label="Close message">
            <b-input class="category_toggle" id="edit_ip" type="text" v-model="edittitle" maxlength="30"></b-input>        
            <b-button class="category_toggle" type="is-danger" @click="editCategory" v-bind:id="editid">Edit</b-button> 
        </b-message>
        </div>
       
       
        <!-- MODAL -->
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered"  role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <input type="text" v-model="edittitle">
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" v-on:click="editCategory" data-dismiss="modal">Edit</button>
                </div>
            </div>
            </div>
        </div> -->
        <!-- END OF MODAL -->

         <!-- MODAL popup-->
        <!-- <div id="popup" class="modalpop">
            <a href="#" class="close">&times;</a>
            <input type="text" placeholder="Edit Board" class="edit_ip" required v-model="edittitle">
            <button type="submit" class="board-edit" id="save_edit" v-on:click="editCategory">Edit</button>
        </div>
        <a href="#" class="closepop"></a> -->
      <!-- END OF MODAL -->

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
      isActive: false
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
#title_ip, #edit_ip {
  width: 50%;
}

.all_categories {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
}

.category_container {
  height: 150px;
  width: 150px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#category_button {
  width: 50%;
  height: 50%;
}

#category_btn_span {
  text-align: center;
  margin-left: 15px;
}

.category_toggle {
  width: 300px;
  height: 150px;
}
</style>
