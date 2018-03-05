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
             <div class="col-md-12 cardLook">
                <p>{{tune.trackName}}</p[>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <img class="img-responsive" :src="tune.artworkUrl60" alt="Card image">
                            </div>
                            <div class="col-sm-6 m-2">
                                <button @click="addToMyTunes(tune)">Add Me</button>                 
                            </div>
                        </div>
                    </div>
                <p id="artist">{{tune.artistName}}</p>
                <audio :src="tune.previewUrl" controls= "controls" style="width: 20reml"></audio>
               
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
        props: ['tune'],
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
            },
            addToMyTunes(tune) {

                this.$store.dispatch('addToMyTunes', tune)
            }
        }
    }
</script>

<style>
    .cardLook {
        border-style: solid;
        border-width: 2px;
        border-top-color: black;
        border-bottom-color: #000;
    }
    
    p {
        font-size: 1.5rem;
    }
</style>