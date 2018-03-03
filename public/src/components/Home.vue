<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="container">
      <div class="row justify-between">
        <div class="col-md-6">
            <itunes class="itunes"></itunes>
        </div>
        <div class="col-md-6">
            <my-tunes class="my-tunes"></my-tunes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MyTunes from './MyTunes.vue'
    import Itunes from './Itunes.vue'
    export default {
        name: 'home',
        data() {
            return {

            }
        },
        components: {
            Itunes,
            MyTunes
        }
    }
</script>


<style>
    .my-tunes {
        display: inline-block;
        min-height: 500px;
        min-width: 50%;
        background: green;
    }
    
    .itunes {
        display: inline-block;
        background: red;
        min-height: 500px;
        min-width: 45%;
    }
</style>