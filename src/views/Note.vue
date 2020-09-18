<template>
 <div class="note">
  
  <div class="input_area">
    <div class="new_note">
      <p id="note_create_msg"> Add a New Note</p>
      <b-input class="note_create_ip" type="text" placeholder="title" v-model="title" maxlength="100"></b-input>
      <b-input class="note_create_ip" type="textarea" placeholder="description" v-model="description" maxlength="250"></b-input>
      <b-input class="note_create_ip" type="textarea" placeholder="solution" v-model="solution" maxlength="250"></b-input>
      <b-input class="note_create_ip" type="text" placeholder="reference" v-model="reference" maxlength="100"></b-input>
      <b-button id="note_title_btn" type="is-danger" @click="newNote">Add</b-button><br/><br/>
    </div>

    <div class="edit_note">
      <p id="note_edit_msg"> Edit Note</p>
      <b-input class="note_edit_ip" type="text" placeholder="title" v-model="edittitle" maxlength="100"></b-input>
      <b-input class="note_edit_ip" type="textarea" placeholder="description" v-model="editdescription" maxlength="250"></b-input>
      <b-input class="note_edit_ip" type="textarea" placeholder="solution" v-model="editsolution" maxlength="250"></b-input>
      <b-input class="note_edit_ip" type="text" placeholder="reference" v-model="editreference" maxlength="100"></b-input>
      <b-button id="note_edit_btn" type="is-danger" @click="editNote">Edit</b-button><br/><br/>
    </div>
  </div>

  <ul class="all_notes">
        <li v-for="note of notes" v-bind:key="note.id">
            <div class="note_container">
              {{note.title}} <br/>
              {{note.description}} <br/>
              {{note.solution}} <br/>
              {{note.reference}} <br/>
            </div>
            <button v-bind:id="note.id" class="button is-success is-outlined" @click="() => {editSelect(note.id, note.title, note.description, note.solution, note.reference)}">Edit</button>
            <button v-bind:id="note.id" class="button is-success is-outlined" @click="deleteNote">Delete</button>
        </li>
    </ul>
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
      editnoteid: null
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
    }
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

/* .new_note{
  display: 
}

.edit_note{

} */

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

</style>
