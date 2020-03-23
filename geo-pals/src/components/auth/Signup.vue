<template>
    <div class="signup container">
        <form action="" class="card-panel" @submit.prevent="signup">
            <h2 class="center deep-blue-text">Signup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="text" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <p class="red-text center" v-if="feedback"> {{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
export default {
    name: 'Signup',
    data(){
        return{
            email: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signup(){
            if(this.alias){
                this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[$*_+~!.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This alias already exists'
                    } else{
                        this.feedback = 'this alias is free to use'
                    }
                })
                // console.log(this.slug)
            }else{
                this.feedback = 'You must have to enter a value'
            }
        }
    }
}
</script>

<style>
    .signup{
        max-width: 400px;
        margin-top: 60px;;
    }

    .signup h2{
        font-size: 2.4em;
    }
</style>