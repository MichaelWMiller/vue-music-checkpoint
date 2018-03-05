<template>
    <div class="my-tunes">
        <h3>List of MyTunes</h3>
        <div>
            <button @click="getMyTunes">GetTracks</button>
        </div>
        <div class="container">
            <div v-for="tune in myTunes" class="row d-md-flex justify-left justify-content-around p-2 m-4" id="mytunes-here">
                <div class="col-md-11 cardLook">
                        <p>{{tune.trackName}}</p>
                   <div class="container">
                       <div class="row">
                           <div class="col-sm-6">
                            <img :src="tune.artworkUrl60" alt="Card image">
                           </div>
                           <div class="col-sm-6">
                            <div class="m-3">
                                <button class="button btn prode" @click="promoteTrack(tune)">Promote Track</button>
                            </div>
                            <div class="m-3">
                                    <button class="button btn prode" @click="demoteTrack(tune)">Demote Track</button>
                                </div>
                           </div>
                       </div>
                   </div>
                   <div>
                        
                    <p id="artist">{{tune.artistName}}</p>
                    <audio :src="tune.previewUrl" controls= "controls" style="width: 20reml"></audio>
                    <!-- <button @click="addToPlayList">Add Me</button> -->
                       <div>
                            <button class="btn button" @click="removeTrack(tune)">Remove From List</button>
                       </div>
                </div>
                </div>

            </div>
        </div>
                
    </div>
           

</template>

<script>
    export default {
        name: 'My-Tunes',
        data() {
            return {

            }
        },
        props: ['tune'],
        computed: {
            myTunes() {
                //return this.$store.state.myTunes
                var updateImage = this.$store.state.myTunes

                for (let i = 0; i < updateImage.length; i++) {
                    const songTrack = updateImage[i];
                    if (songTrack.artworkUrl160) {
                        var newArt = songTrack.artworkUrl100.replace('60x60bb', '500x500bb')
                        songTrack.artworkUrl100 = newArt
                    }
                }
                return this.$store.state.myTunes
            },
            activeMyTune() {
                return this.$store.state.activeMyTune
            },

        },
        methods: {
            getMyTunes() {
                this.$store.dispatch('getMyTunes')
            },
            removeTrack(tune) {
                this.$store.dispatch('removeTrack', tune)
            },
            promoteTrack(tune) {
                this.$store.dispatch('promoteTrack', tune)
            },
            demoteTrack(tune) {
                this.$store.dispatch('demoteTrack', tune)
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
    
    button {
        margin: 3px;
    }
    
    p {
        font-size: 1.5rem;
    }
    
    img {
        width: 160px;
        height: 160PX;
    }
    
    i {
        width: 5 px;
        color: yellow;
    }
</style>