<template>
    <div class="login container">
        <form @submit.prevent="login" action="" class="card-panel">
            <h2 class="center deep-blue-text">Login</h2>
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="text" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <p v-if="feedback" class="red-text center"> {{ feedback }}</p>
                <div class="field center">
                    <button class="btn deep-purple">Login</button>
                </div>
            
        </form>
    </div>
</template>

<script>
import firebase, { auth } from 'firebase'

export default {
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login(){
            // console.log(this.email, this.password)
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    console.log(cred.user)
                    this.$router.push({ name: 'GMap' })
                }).catch(err => {
                    this.feedback = err.message  
                })
                this.feedback = null
            }else{
                this.feedback = 'You must fill in both fields'
            }
        }
    }
}
</script>

<style>
    .login{
        max-width: 400px;
        margin-top: 60px;
    }

    .login h2{
        font-size: 2.4em;
    }
</style>