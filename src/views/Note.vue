<template>
 <div class="note">

  <div class="new_note">
    <p id="note_create_msg"> Add a New Note</p>
    <b-input class="note_create_ip" type="text" placeholder="title" v-model="title" maxlength="30"></b-input>
    <b-input class="note_create_ip" type="text" placeholder="description" v-model="description" maxlength="30"></b-input>
    <b-input class="note_create_ip" type="text" placeholder="solution" v-model="solution" maxlength="30"></b-input>
    <b-input class="note_create_ip" type="text" placeholder="reference" v-model="reference" maxlength="30"></b-input>
    <b-button id="note_title_btn" type="is-danger" @click="newNote">Add</b-button><br/><br/>
  </div>

  <ul class="all_notes">
        <li v-for="note of notes" v-bind:key="note.id">
            <div class="note_container">
              {{note.title}} <br/>
              {{note.description}} <br/>
              {{note.solution}} <br/>
              {{note.reference}} <br/>
            </div>
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
      // category: "",
      // noteInput: "",
    };
  },
  created: function() {
    this.getNote();
  },
  methods: {
    newNote: function() {
      const {token, URL} = this.$route.query;
      const category = this.$route.params.categoryid;
      console.log(category)

      fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes`, {
      method: "post",
      headers: {
        authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: this.title }, {description: this.description}, {solution: this.solution}, {reference: this.reference}, {category: {category}}),
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
    // refreshNote: function(){
    //   const {token, URL} = this.$route.query;
    //   fetch(`${URL}/api/categories/${this.$route.params.categoryid}/notes`, {
    //   method: "get",
    //   headers: {
    //   authorization: `JWT ${token}`,
    //   },
    // })
    // .then((response) => response.json())
    // .then(data => {
    //     this.boardSingle = true
    //     if (!data.response){
    //         this.notes = data
    //         if (!data) {
    //             this.notes = ""
    //         }
    //         } else {
    //           this.notes = []
    //         }
    //     })
    // },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

#note_create_msg {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.5rem;
}

.note_create_ip, #note_title_btn {
  margin-top: 15px;
}

.note_create_ip {
  width: 50%;
  margin-left: 20rem;  
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
  /* background-image: url("https://res.cloudinary.com/dqduwnrb1/image/upload/v1600310362/coding_asvhd8.jpg"); */
  font-family: 'Ubuntu', sans-serif;
  color: red;
}

</style>
