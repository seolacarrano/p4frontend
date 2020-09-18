<template>
  <div class="signup">
    <b-input id="firstname_ip" v-model="first_name" placeholder="first name"></b-input>
    <b-input id="lastname_ip" v-model="last_name" placeholder="last name"></b-input>
    <b-input id="username_ip" v-model="username" placeholder="username"></b-input>
    <b-input id="email_ip" v-model="email" placeholder="email"></b-input>
    <b-input id="password_ip" type="password" v-model="password" placeholder="password" password-reveal></b-input>

    <br/>
    <button class="button is-danger" @click="handleSignup">Sign Up</button>
  </div>
</template>

<script>
export default {
    name: "Signup",
    data: function() {
        return {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
        };
    },
    methods: {
        handleSignup: function() {
            fetch(`${this.$route.query.URL}/auth/users/register/`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.username,
                    email: this.email,
                    password: this.password,                
                }),
            })
            .then(response => 
            {
                if (response.status == 200) {
                    response.json().then(data => {
                        this.$router.push({
                            name: "Login",
                            query: this.$route.query,
                            params: {message: "complete"}
                        })
                        console.log(data)
                        alert('You have successfully signed up!')
                    })
                } else {
                    return response.json()
                }
            }
            )
        //     .then(data => {
        //         console.log(data)
        //         if (data) {
        //         this.$emit('signUp', data)
        //         } else {
        //             alert('In correct Signup')
        //         }
        //     });
       },
    },
};
</script>


<style>
.signup {
  width: 50%;
  margin: 20px auto;
}

#username_ip, #password_ip, #firstname_ip, #lastname_ip, #email_ip {
    border: 1px solid#42b983;
    margin-top: 5px;
}
</style>