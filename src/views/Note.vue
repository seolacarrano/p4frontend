<template>
 <div class="note">
  <!-- create a note -->
  <b-collapse :open="false" aria-id="contentIdForA11y1">
      <button id="new_note_btn" slot="trigger" aria-controls="contentIdForA11y1">Add a New Note</button>
      <div class="notification">
          <div class="content">
            <b-input class="note_create_ip" type="text" placeholder="title" v-model="title" maxlength="100"></b-input>
            <b-input class="note_create_ip" type="textarea" placeholder="description" v-model="description" maxlength="250"></b-input>
            <b-input class="note_create_ip" type="textarea" placeholder="solution" v-model="solution" maxlength="250"></b-input>
            <b-input class="note_create_ip" type="text" placeholder="reference" v-model="reference" maxlength="100"></b-input>
            <b-button id="note_title_btn" type="is-danger" @click="newNote">Add</b-button><br/><br/>
          </div>
      </div>
  </b-collapse>
  <!-- create a note end -->

   <!-- get modal -->
   <div class="note_list" v-for="note of notes" v-bind:key="note.id">
    <!-- <button v-bind:id="note.id" class="get_note_btn2" v-on:click="isCardModalActive = true">{{note.title}}</button> -->
    <button v-bind:id="note.id" class="get_note_btn2" v-on:click="isCardModalActive = true" @click="() => {getSelect(note.id)}">{{note.title}}</button>                                    

  
    <b-modal v-if="note.id == getnoteid" v-model="isCardModalActive" :width="640" scroll="keep">
    <div class="card">
      <div class="card-content">
        <p>Edit Note</p>
        <div id="description2"><p class="division">description</p> {{note.description}} </div>
        <div id="solution2"><p class="division">solution</p> {{note.solution}} </div>
        <div id="reference2"><p class="division">reference</p> {{note.reference}} </div>
        <div id="note_content_btn">
              <button v-bind:id="note.id" class="edit_btn" v-on:click="isCardModalActive = true" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button>                                    
              <button v-bind:id="note.id" class="del_btn" @click="deleteNote">Delete</button>
              </div>
        </div>
    </div>
    </b-modal>
   </div> 

  <!------- get all notes / edit&delete buttons -------->
  <ul class="all_notes">
    <li class="note_list" v-for="note of notes" v-bind:key="note.id">
      <!-- <b-collapse :open="false" aria-id="contentIdForA11y1">
        <button id="get_note_btn" slot="trigger" aria-controls="contentIdForA11y1">{{note.title}}</button>
        <div class="notification" id="all_note_notification">
            <div class="content">
              <div id="note_content">  
              <div id="description"><p class="division">description</p> {{note.description}} </div>
              <div id="solution"><p class="division">solution</p> {{note.solution}} </div>
              <div id="reference"><p class="division">reference</p> {{note.reference}} </div>
              </div>
              <div id="note_content_btn">
              <button v-bind:id="note.id" class="edit_btn" v-on:click="isCardModalActive = true" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button>                                    
              <button v-bind:id="note.id" class="del_btn" @click="deleteNote">Delete</button>
              </div>
            </div>
        </div>
      </b-collapse> -->


    <!-- edit modal -->
    <b-modal v-if="note.id == editnoteid" v-model="isCardModalActive" :width="640" scroll="keep">
    <div class="card">
      <div class="card-content">
        <p>Edit Note</p>
        <b-input class="note_edit_ip" type="text" placeholder="title" v-model="edittitle" maxlength="100"></b-input>
        <b-input class="note_edit_ip" type="textarea" placeholder="description" v-model="editdescription" maxlength="250"></b-input>
        <b-input class="note_edit_ip" type="textarea" placeholder="solution" v-model="editsolution" maxlength="250"></b-input>
        <b-input class="note_edit_ip" type="text" placeholder="reference" v-model="editreference" maxlength="100"></b-input>        
        <b-button type="is-danger" @click="editNote" v-bind:id="editnoteid">Edit</b-button> 
      </div>
    </div>
    </b-modal>

      <!--------dropddown---------->
      <!-- <b-dropdown id="note_dropdown" aria-role="list">
            <b-button id="note_btn" type="is-success" slot="trigger" slot-scope="{ active }">
                <span id="note_btn_span">•••</span>
                <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
            </b-button>
            <div id="dropdown_list">
            <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="edit_btn" v-on:click="isActive = !isActive" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button></b-dropdown-item>                                    
            <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="del_btn" @click="deleteNote">Delete</button></b-dropdown-item>
            </div>
        </b-dropdown> -->

        <!-------toggle------->
        <!-- <div v-if="note.id == editnoteid" class="note_toggle">
        <b-message title="Edit Note"  v-model="isActive" aria-close-label="Close message">
            <b-input class="note_edit_ip" type="text" placeholder="title" v-model="edittitle" maxlength="100"></b-input>
            <b-input class="note_edit_ip" type="textarea" placeholder="description" v-model="editdescription" maxlength="250"></b-input>
            <b-input class="note_edit_ip" type="textarea" placeholder="solution" v-model="editsolution" maxlength="250"></b-input>
            <b-input class="note_edit_ip" type="text" placeholder="reference" v-model="editreference" maxlength="100"></b-input>        
            <b-button type="is-danger" @click="editNote" v-bind:id="editnoteid">Edit</b-button> 
        </b-message>
        </div> -->
    </li>
  </ul>
  <!-- get all notes end -->
 </div>
</template>


<script>
export default {
  name: 'Note',
  data: function(){
    return {
      notes: [],
      getnoteid: null,
      title: "",
      description: "",
      solution: "",
      reference: "",
      edittitle: "",
      editdescription: "",
      editsolution: "",
      editreference: "",
      editnoteid: null,
      isActive: false,
      isCardModalActive: false,
    };
  },
  created: function() {
    this.getNote();
  },
  methods: {
    newNote: function() {
      const {token, URL} = this.$route.query;
      const category = this.$route.params.categoryid;

      fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes`, {
      method: "post",
      headers: {
        authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: this.title, description: this.description, solution: this.solution, reference: this.reference, category: category}),
    }).then(() => {
       this.getNote();
    });
    },
    getSelect: function(id){
      this.getnoteid = id
    },
    getNote: function(){
      const {token, URL} = this.$route.query;
      
     fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes`, {
      method: "get",
      headers: {
      authorization: `JWT ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.notes = data;
    });
    },
    deleteNote: function(event) {
      const { token, URL } = this.$route.query;
      const id = event.target.id;
      fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes/${id}`, {
        method: "delete",
        headers: {
          authorization: `JWT ${token}`,
        },
      }).then(() => {
        this.getNote();
      });
    },
     editSelect: function(id, title, description, solution, reference){
      this.editnoteid = id
      this.edittitle = title
      this.editdescription = description
      this.editsolution = solution
      this.editreference = reference
    },
    editNote: function() {
      const { token, URL } = this.$route.query;
      const id = this.editnoteid;
      const category = this.$route.params.categoryid;
      fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes/${id}`, {
        method: "put",
        headers: {
          authorization: `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({title: this.edittitle, description: this.editdescription, solution: this.editsolution, reference: this.editreference, category: category})
      }).then(() => {
        this.getNote();
        this.edittitle = "";
        this.editdescription = "";
        this.editsolution = "";
        this.editreference = "";
      });
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

.note_create_ip, .note_edit_ip, #note_title_btn {
  margin-top: 15px;
}

#new_note_btn{
  font-family: 'Ubuntu', sans-serif;
  transition-duration: 0.4s;
  background-color: #f44174; 
  border-radius: 12px;
  color: black;
  height: 50px;
  width: 150px;
  border: none;
  margin-bottom: 50px;
  cursor: pointer;
}

#new_note_btn:hover {
  background-color: #42b983; 
  color: white;
  cursor: pointer;
}

#get_note_btn {
  font-family: 'Ubuntu', sans-serif;
  transition-duration: 0.4s;
  background-color: #42b983; 
  border-radius: 12px;
  color: white;
  height: 50px;
  width: 150%;
  border: none;
  cursor: pointer;
}

#get_note_btn:hover {
  background-color: #f44174; 
  color: white;
  cursor: pointer;
}

.all_notes {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: 'Ubuntu', sans-serif;
  font-size: large;
  margin-top: 20px;
}

.note_list {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  margin-left: 40%;
  padding-bottom: 0.5rem;
}

#note_btn {
  width: 50%;
  cursor: pointer;
}

#note_btn_span {
  text-align: center;
  margin-left: 15px;
}

#note_content{
  margin-left: 1rem;
}

.edit_btn, .del_btn{
  margin-right: 2rem;
}

#dropdown_list{
  padding-right: 0.5rem;
}

#all_note_notification {
  width: 80%;
  margin-left: 10%;
}

.division{
  background-color:lightcoral;
  font: white;
  /* height: 3rem; */
  margin-top: 20px;
}

#description {
  background-color: lavender;
}

#solution {
  background-color: lavender;
}

#reference {
  background-color:lavender;
}
</style>
