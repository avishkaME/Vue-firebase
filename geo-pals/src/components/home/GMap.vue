<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'GMap',
    data(){
        return{
            lat: 53,
            lng: -2
        }

    },
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat , lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })
            
            db.collection('users').get().then(users => {
                users.docs.forEach(doc => {
                    let data = doc.data()
                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        //add click listner to the marker
                        marker.addListener('click', ()=>{
                            this.$router.push({ name: 'ViewProfile', params: { id: doc.id }})
                        })
                    }
                })
            })
        }
    },
    mounted(){
        //get current user
        let user = firebase.auth().currentUser
        // console.log(user)

        //get users geo location
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                //find the user record and update the geocoords
                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                    })
                }).then(() => {
                    this.renderMap()
                })
     
            }, (err) => {
                console.log(err)
                this.renderMap()
            }, { maximumAge: 60000, timeout:3000 })
        } else{
            //position center by default values
            this.renderMap()
        }
        
    }
}
</script>

<style>
    .google-map{
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 auto;
        z-index: -1;
    }
</style>