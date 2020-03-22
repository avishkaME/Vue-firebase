<template>
  <div class="index container">
    <div class="card" v-for="menu in menues" :key="menu.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteMenu(menu.id)">delete</i>
        <h2 class="indigo-text"> {{ menu.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in menu.ingredients" :key="index">
            <span class="chip"> {{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditMenu', params: {menu_slug: menu.slug }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      menues: []
    }

  },
  methods: {
    deleteMenu(id){
      //delete   doc from firestore
      db.collection('menues').doc(id).delete()
      .then(() => {
        this.menues = this.menues.filter(menu => {
        return menu.id != id
        })
      })
      
    }
  },
  created(){
    //fetch data from the firestore
    db.collection('menues').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let menu = doc.data()
        menu.id = doc.id
        this.menues.push(menu)
        // console.log(doc.data(), doc.id)
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }

  .index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;

  }

  .index .ingredients{
    margin: 30px auto;
  }

  .index .ingredients li{
    display: inline-block;
  }

  .index .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>
