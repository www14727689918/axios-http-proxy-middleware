<template>
  <div id="app">

    <img src="./assets/logo.png" @click="tab0">
    <input type="text" placeholder="uname" v-model="uname">
    <input type="text" placeholder="pwd" v-model="upwd">
    <p>{{uname}}&{{upwd}}</p>
    <input type="button" value="点我调用第三方api" @click="tab1">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import querystring from 'querystring'
export default {
  name: 'app',
  data: function () {
    return {
      uname:'',
      upwd:'',
      page:1
    }
  },
  methods:{
    tab0(){
//      axios.get('/apis/dish').then(function(data){
//        console.log(data);
//      })
      axios.post('/apis/user',{'uname':this.uname,'pwd':this.upwd}).then(function(data){
        console.dir(data.data);
      })
    },
//    tab1(){
//      axios.get('/apis/main/datagrid2_getdata.php',{params:({'page':this.page})}).then(function (data) {
//        console.dir(data)
//      })
//    }
    submitForm(event) {

    },
    tab1(){
      event.preventDefault();
      let formData = new FormData();
      formData.append('page', this.page);
//      formData.append('age', this.age);
//      formData.append('file', this.file);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('/apis/main/datagrid2_getdata.php',formData,config).then(function (data) {
        console.dir(data)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
