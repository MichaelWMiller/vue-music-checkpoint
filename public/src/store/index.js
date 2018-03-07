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
            debugger
            var arr = payload
            var obj1 = arr[0]['likes']
            var obj2 = arr[1]['likes']
            var comp = 0

            arr.sort(function() {
                for (var i = 0; i < arr.length; i++) {
                    var obj1 = arr[i]['likes']
                    if (i >= arr.length - 1) {
                        return comp
                    }
                    var obj2 = arr[i + 1]['likes']
                    var comp = 0
                    if (obj1 > obj2) {
                        comp = 1
                    } else if (obj2 > obj1) {
                        comp = -1
                    }

                }
                return comp
            })

            console.log(arr)

            payload = arr
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
                    tune.likes = newInd

                    var chIndex = i
                    break;
                }
            }
            var obj1 = arr[0]['likes']
            var obj2 = arr[1]['likes']
            var comp = 0

            arr.sort(function() {
                var obj1 = arr[0]['likes']
                var obj2 = arr[1]['likes']
                var comp = 0

                for (var i = 0; i < arr.length; i++) {
                    obj1 = arr[i]['likes']
                    if (i >= arr.length - 1) {
                        return comp
                    }
                    obj2 = arr[i + 1]['likes']
                    if (obj1 > obj2) {
                        comp = 1
                    } else if (obj2 > obj1) {
                        comp = -1
                    }

                }
                return comp
            })

            //payload[chIndex].save


            mytunesDB.put("/", arr)
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
                    tune.likes = newInd
                    var chIndex = i
                    break;
                }


            }

            var obj1 = arr[0]['likes']
            var obj2 = arr[1]['likes']
            var comp = 0
            arr.sort(function() {


                for (var i = 0; i < arr.length; i++) {
                    obj1 = arr[i]['likes']
                    if (i >= arr.length - 1) {
                        return comp
                    }
                    obj2 = arr[i + 1]['likes']
                    if (obj1 > obj2) {
                        comp = 1
                    } else if (obj2 > obj1) {
                        comp = -1
                    }

                }
                return comp
            })

            mytunesDB.put("/", arr)
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

            mytunesDB
                .get(payload)
                .then(res => {
                    commit("setMyResults", res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addToMyTunes({ commit, dispatch }, track) {

            track['likes'] = 0
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
        putLikes({ commit, dispatch }, payload) {

            mytunesDB
                .put("/api/mytunes/" + payload.track._id, payload)
                .then(res => {
                    dispatch("getMyTunes", res.data)
                })

        },
        promoteTrack({ commit, dispatch }, track) {
            var id = track._id
            mytunesDB(track)
                .then(res => {

                    commit("promoteTrack", id)
                    dispatch("getMyTunes", res.data)
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
                    commit("setMyResults")
                })
                .catch(err => {
                    console.error(err)
                })
        }

    }
})

//export default store