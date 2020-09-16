<template>
  <div class="login">
    <b-field label="Username"
            type="is-danger">
            <b-input id="username_ip" v-model="username"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input id="password_ip" type="password"
                v-model="password"
                password-reveal>
            </b-input>
        </b-field>  

    <br/>
    <button class="button is-danger" @click="handleLogin">Log In</button>
  </div>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        handleLogin: function() {
            fetch(`${this.$route.query.URL}/auth/users/login/`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.$emit('loggedIn', data)
            });
        },
    },
};
</script>


<style>
.login {
  width: 50%;
  margin: 10px auto;
}

#username_ip, #password_ip {
    border: 1px solid#42b983;
}
</style>