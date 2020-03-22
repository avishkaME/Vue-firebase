<template>
    <div v-if="menu" class="edit-menu container">
        <h2>Edit {{ menu.title }} Menu </h2>
        <form @submit.prevent="EditMenu">
            <div class="field title">
                <label for="title">Menu title:</label>
                <input type="text" name="title" id="" v-model="menu.title">
            </div>
            <div v-for="(ing, index) in menu.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" id="" v-model="menu.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback}}</p>
                <button class="btn pink">Add Menu</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditMenu',
    data(){
        return{
            menu: null,
            another: null,
            feedback: null 
        }
    },
    methods: {
        EditMenu(){
            // console.log(this.menu.title)
            if(this.menu.title){
                this.feedback = null
                //create a slug
                this.menu.slug = slugify(this.menu.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                
                // console.log(this.slug)
                db.collection('menues').doc(this.menu.id).update({
                    title: this.menu.title,
                    ingredients: this.menu.ingredients,
                    slug: this.menu.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'}).catch(err => {
                        console.log(err)
                    })
                })
            }else{
                this.feedback = 'You must enter a menu title'
            }
        },
        addIng(){
            if(this.another){
                this.menu.ingredients.push(this.another)
                this.another = null
                this.feedback = null

            }else{
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng(ing){
            this.menu.ingredients = this.menu.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('menues').where('slug', '==', this.$route.params.menu_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                this.menu = doc.data()
                this.menu.id = doc.id
            })
        })
    }
}
</script>

<style>
    .edit-menu{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-menu h2{
        font-size: 2em;
        margin: 20px auto;
    }

    .edit-menu .field{
        margin: 20px auto;
        position: relative;
    }
    .edit-menu .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>