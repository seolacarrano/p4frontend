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
        
        <!-- ------dropddown-------- -->
        <b-dropdown aria-role="list">
            <button id="category_button" class="button is-primary" slot="trigger" slot-scope="{ active }">
                <span id="category_btn_span">•••</span>
                <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
            </button>

            <!-- <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="button is-success is-outlined" @click="() => {editSelect(category.id, category.title)}">Edit</button></b-dropdown-item> -->
            <b-dropdown-item aria-role="listitem"><button class="button is-success is-outlined" data-target="#category_edit_modal">Edit</button></b-dropdown-item>
            <b-dropdown-item aria-role="listitem"><button v-bind:id="category.id" class="button is-success is-outlined" @click="deleteCategory">Delete</button></b-dropdown-item>
        </b-dropdown>
       
        <!-- MODAL -->
        <div class="modal fade" id="category_edit_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-primary" @click="() => {editSelect(category.id, category.title)}" data-dismiss="modal">Update Item</button>
                </div>
            </div>
            </div>
        </div>

      <!-- END OF MODAL -->

          <!-- <button v-bind:id="category.id" class="button is-success is-outlined" @click="deleteCategory">Delete</button> -->
          <!-- <button v-bind:id="category.id" class="button is-success is-outlined" @click="() => {editSelect(category.id, category.title)}">Edit</button> -->
        </div>  
      </li>
    </ul>    
  </div>
</template>

<script>
// ------------------------modal------------------------ 
    // const ModalForm = {
    //     props: ['email', 'password', 'canCancel'],
    //     template: `
    //         <form action="">
    //             <div class="modal-card" style="width: auto">
    //                 <header class="modal-card-head">
    //                     <p class="modal-card-title">Login</p>
    //                     <button
    //                         type="button"
    //                         class="delete"
    //                         @click="$emit('close')"/>
    //                 </header>
    //                 <section class="modal-card-body">
    //                     <b-field label="Email">
    //                         <b-input
    //                             type="email"
    //                             :value="email"
    //                             placeholder="Your email"
    //                             required>
    //                         </b-input>
    //                     </b-field>

    //                     <b-field label="Password">
    //                         <b-input
    //                             type="password"
    //                             :value="password"
    //                             password-reveal
    //                             placeholder="Your password"
    //                             required>
    //                         </b-input>
    //                     </b-field>

    //                     <b-checkbox>Remember me</b-checkbox>
    //                 </section>
    //                 <footer class="modal-card-foot">
    //                     <button class="button" type="button" @click="$emit('close')">Close</button>
    //                     <button class="button is-primary">Login</button>
    //                 </footer>
    //             </div>
    //         </form>
    //     `
    // }

export default {
  // components: {
  //           ModalForm
  //       },
  name: 'Main',
  data: function(){
    return {
      categories: [],
      title: "",
      edittitle: "",
      editid: null,
      // isComponentModalActive: false,
      // formProps: {
      //               email: 'evan@you.com',
      //               password: 'testing'
      //           }
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
  height: 100%;
}

#category_btn_span {
  text-align: center;
  padding-right: 4px;
}
</style>
