<template>
    <div class="my-tunes">
        <h3>List of MyTunes</h3>
        <div>
            <button @click="getTracks">GetTracks</button>
        </div>
        <div class="container">
            <div v-for="tune in myTunes" class="row d-md-flex justify-left justify-content-around p-2 m-4" id="itunes-here">
                <div class="col-md-11">
                    <div>
                        <p>{{tune.trackName}}A paragraph</p>
                        <i class="fas fa-caret-up">Promote</i>
                        <i class="fas fa-caret-down">Demote</i>
                    </div>
                </div>
            </div>
            <div>
                <img class="img-responsive" :src="tune.artworkUrl60" alt="Card image">
                <p id="artist">{{tune.artistName}}</p>
                <audio :src="tune.previewUrl" controls= "controls" style="width: 20reml"></audio>
                <!-- <button @click="addToPlayList">Add Me</button> -->
                
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
        computed: {
            tunes() {
                return this.$Store.state.searchResults
            },
            activeMyTune() {
                return this.$store.state.activeMyTune
            }
        },
        methods: {

        }
    }
</script>

<style>
    button {
        font-size: 11px;
    }
</style>