import vue from 'vue'
import vuex from 'vuex'
import axios from "axios";
import $ from 'jquery'

let mytunesDB = axios.create({
    baseURL: "//localhost:3000/api/mytunes",
    withCredentials: true,
    timeout: 2000
})


vue.use(vuex)

export default new vuex.Store({
    state: {
        myTunes: [],
        results: [],
        track: {},
        tune: {},
        activeMytune: {},
        activeId: {}
    },
    mutations: {
        setMyResults(state, payload) {
            state.myTunes = payload
        },
        setResults(state, results) {
            state.results = results
        },
        setActiveMytune(state, payload) {
            state.activeMytune = payload;
        },
        addToMyPlayList(state, payload) {
            state.activeMytune = payload
        },
        promoteTrack(state, id) {

            var arr = state.myTunes
            var newInd = 0

            //var arr = payload
            for (var i = 0; i < arr.length; i++) {
                var tune = arr[i]

                if (id == arr[i]._id) {
                    if (i > 0) {
                        newInd = i - 1
                    } else {
                        newInd == 0
                    }
                    arr.splice(newInd, 0, arr.splice(i, 1)[0]);
                    var chIndex = i
                    break;
                }

            }
            //payload[chIndex].save

            state.myTunes = arr

        },
        demoteTrack(state, id) {

            var arr = state.myTunes
            var newInd = arr.length - 1

            //var arr = payload
            for (var i = 0; i < arr.length; i++) {
                var tune = arr[i]

                if (id == arr[i]._id) {
                    if (i < arr.length - 1) {
                        newInd = i + 1
                    } else {
                        newInd == arr.length - 1
                    }

                    arr.splice(newInd, 0, arr.splice(i, 1)[0]);
                    var chIndex = i
                    break;
                }

            }
            //payload[chIndex].save

            state.myTunes = arr

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
                    commit("setMyResults", res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addToMyTunes({ commit, dispatch }, track) {

            mytunesDB
                .post("", track)
                .then(res => {
                    dispatch("getMyTunes", res.data)
                })
                .catch(err => {
                    console.error(err);
                })
                //this will post to your server adding a new track to your tunes
        },
        removeTrack({ commit, dispatch }, track) {
            mytunesDB
                .delete("" + track._id)
                .then(res => {
                    dispatch("getMyTunes", res.data)
                })
                .catch(err => {
                    console.error(err)
                })

            //Removes track from the database with delete
        },
        promoteTrack({ commit, dispatch }, track) {
            var id = track._id
            mytunesDB(track)
                .then(res => {

                    commit("promoteTrack", id)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        demoteTrack({ commit, dispatch }, track) {
            //this should decrease the position / upvotes and downvotes on the track
            var id = track._id
            mytunesDB(track)
                .then(res => {

                    commit("demoteTrack", id)
                })
                .catch(err => {
                    console.error(err)
                })
        }

    }
})

//export default store