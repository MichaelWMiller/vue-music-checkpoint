import vue from 'vue'
import vuex from 'vuex'
import axios from "axios";
import $ from 'jquery'

let mytunesDB = axios.create({
    baseURL: "//localhost:3000/api/mytunes",
    timeout: 2000
})


vue.use(vuex)

export default new vuex.Store({
    state: {
        myTunes: [],
        results: [],
        activeMytune: {}
    },
    mutations: {
        setResults(state, results) {

            state.results = results
        },
        setActiveMytune(state, payload) {
            state.activeMytune = payload;
        },
        addToMyPlayList(state, payload) {
            state.activeMytune = payload
        }
    },
    actions: {
        getMusicByArtist({ commit, dispatch }, artist) {

            var url = '//bcw-getter.herokuapp.com/?url=';
            var url2 = 'https://itunes.apple.com/search?term=' + artist;
            var apiUrl = url + encodeURIComponent(url2);
            $.get(apiUrl).then(res => {
                res = JSON.parse(res)
                commit('setResults', res.results)
            })
        },
        getMyTunes({ commit, dispatch }, payload) {
            //this should send a get request to your server to return the list of saved tunes
            mytunesDB(payload)
                .then(res => {
                    commit("setResults", res.data.results)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addToMyTunes({ commit, dispatch }, track) {
            //this will post to your server adding a new track to your tunes
        },
        removeTrack({ commit, dispatch }, track) {
            //Removes track from the database with delete
        },
        promoteTrack({ commit, dispatch }, track) {
            //this should increase the position / upvotes and downvotes on the track
        },
        demoteTrack({ commit, dispatch }, track) {
            //this should decrease the position / upvotes and downvotes on the track
        }

    }
})

//export default store