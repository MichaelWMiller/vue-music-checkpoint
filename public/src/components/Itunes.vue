<template>
    <div class="itunes">
        <h3>iTunes Search</h3>
        <form class="col-sm-12" @submit.prevent='getMusicByArtist'>
                <input type="text" v-model="artist" placeholder="Artist">
                <button type="submit">Search iTunes</button>
        </form>
        <div></div>
        <div class="container">
          <div v-for="tune in tunes" class="row d-md-flex justify-left justify-content-around p-2 m-4" id="itunes-here">
             <div class="col-md-12">
                <p>{{tune.trackName}}</p[>
                <img class="img-responsive" :src="tune.artworkUrl60" alt="Card image">
                <p id="artist">{{tune.artistName}}</p>
                <audio :src="tune.previewUrl" controls= "controls" style="width: 20reml"></audio>
                <button @click="addToPlayList">Add Me</button>
             </div> 
          </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'iTunes',
        data() {
            return {
                artist: '',
                myArtist: ''
            }
        },
        computed: {
            tunes() {
                return this.$store.state.results
            },
            activeTune() {
                return this.$store.state.activeTune
            }
        },
        methods: {
            getMusicByArtist() {

                this.$store.dispatch('getMusicByArtist', this.artist)
            },
            getMyTunes() {
                this.$store.dispatch('getMyTunes')
            }
        }
    }
</script>

<style>
    p {
        font-size: 1.5rem;
    }
</style>