<template>

<div class="app-container">
  <PostCreate/> 
  <ShowPost :postedAllItem="getPostedData" :key="getPostedData.length" />

</div>
</template>

<script>
import ShowPost from './components/show_post/Index.vue'
import PostCreate from './components/post_create/Index.vue'


export default {
  name: 'App',
  components: {
    ShowPost,
    PostCreate
  },
  data(){
    return {
        postedDatas:[]
    }
  },
      computed:{
        getPostedData(){
            return this.postedDatas ;
        }
    },

    mounted() {
  window.addEventListener('postsModified', (event) => {
    this.postedDatas = event.detail.posts;
  });
},

    created(){
      
      if(!localStorage.getItem('postedDatas')) {
        localStorage.setItem('postedDatas',JSON.stringify([])); 
      } 
      else {
        const postedItemsContainer = JSON.parse(localStorage.getItem('postedDatas'));
         this.postedDatas =  postedItemsContainer ;
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  background: #34495E;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow-x: hidden ;
  
}
</style>
