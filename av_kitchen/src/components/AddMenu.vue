<template>
    <div class="add-menu container">
        <h2 class="center-align indigo-text">Add new menu</h2>
        <form @submit.prevent="AddMenu">
            <div class="field title">
                <label for="title">Menu title:</label>
                <input type="text" name="title" id="" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" id="" v-model="ingredients[index]">
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
    name: 'AddMenu',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddMenu(){
            // console.log(this.title, this.ingredients)
            if(this.title){
                this.feedback = null
                //create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                
                // console.log(this.slug)
                db.collection('menues').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null

            }else{
                this.feedback = 'You must enter a value'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
    .add-menu{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-menu h2{
        font-size: 2em;
        margin: 20px auto;
    }

    .add-menu .field{
        margin: 20px auto;
        position: relative;
    }
    .add-menu .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>