<template>
 <div class="note">

   <!-- create a note -->
  <b-collapse :open="false" aria-id="contentIdForA11y1">
      <button
          class="button is-primary"
          slot="trigger"
          aria-controls="contentIdForA11y1">Add a New Note</button>
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


  <!-- get all notes -->
  <ul class="all_notes">
    <li v-for="note of notes" v-bind:key="note.id">
      <b-collapse :open="false" aria-id="contentIdForA11y1">
        <button
            class="button is-primary"
            slot="trigger"
            aria-controls="contentIdForA11y1">{{note.title}}</button>
        <div class="notification">
            <div class="content">
              {{note.description}} <br/>
              {{note.solution}} <br/>
              {{note.reference}} <br/>
            </div>
        </div>
      </b-collapse>
      <!--------dropddown---------->
      <b-dropdown id="note_dropdown" aria-role="list">
            <b-button type="is-success" slot="trigger" slot-scope="{ active }">
                <span id="note_btn_span">•••</span>
                <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
            </b-button>
            
            <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="edit_btn" v-on:click="isActive = !isActive" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button></b-dropdown-item>                                    
            <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="del_btn" @click="deleteNote">Delete</button></b-dropdown-item>
        </b-dropdown>

        <!-------toggle------->
        <div v-if="note.id == editnoteid" class="note_toggle">
        <b-message title="Edit Note"  v-model="isActive" aria-close-label="Close message">
            <b-input class="note_edit_ip" type="text" placeholder="title" v-model="edittitle" maxlength="100"></b-input>
            <b-input class="note_edit_ip" type="textarea" placeholder="description" v-model="editdescription" maxlength="250"></b-input>
            <b-input class="note_edit_ip" type="textarea" placeholder="solution" v-model="editsolution" maxlength="250"></b-input>
            <b-input class="note_edit_ip" type="text" placeholder="reference" v-model="editreference" maxlength="100"></b-input>        
            <b-button type="is-danger" @click="editNote" v-bind:id="editnoteid">Edit</b-button> 
        </b-message>
        </div>
    </li>
  </ul>
  <!-- get all notes end -->
   
  
    <!------------------------------ old version note area -------------------------->
    <!-- <li v-for="note of notes" v-bind:key="note.id">
        <div class="note_container">
          {{note.title}} <br/>
          {{note.description}} <br/>
          {{note.solution}} <br/>
          {{note.reference}} <br/>
        </div> -->

        <!--------dropddown---------->
        
          <!-- <b-dropdown id="note_dropdown" aria-role="list">
              <b-button type="is-success" slot="trigger" slot-scope="{ active }">
                  <span id="note_btn_span">•••</span>
                  <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
              </b-button>
              
              <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="edit_btn" v-on:click="isActive = !isActive" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button></b-dropdown-item>                                    
              <b-dropdown-item aria-role="listitem"><button v-bind:id="note.id" class="del_btn" @click="deleteNote">Delete</button></b-dropdown-item>
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

        <!-- <button v-bind:id="note.id" class="button is-success is-outlined" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button>
        <button v-bind:id="note.id" class="button is-success is-outlined" @click="deleteNote">Delete</button> 
    </li>-->
    <!------------------------------ old version note area end-------------------------->
</div>
</template>


<script>
export default {
  name: 'Note',
  data: function(){
    return {
      notes: [],
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

.input_area{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

#note_create_msg, #note_edit_msg {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.5rem;
}

.note_create_ip, .note_edit_ip, #note_title_btn {
  margin-top: 15px;
}

.all_notes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-family: 'Ubuntu', sans-serif;
  font-size: large;
  margin-top: 20px;
}

.note_container {
  height: 150px;
  width: 150px;
  padding-top: 2rem;
  margin-left: 5rem;
  margin-right: 5rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #42b983;
  border-radius: 8px;
  font-family: 'Ubuntu', sans-serif;
  color: red;
}

#note_btn_span {
  text-align: center;
  margin-left: 15px;
}
</style>
