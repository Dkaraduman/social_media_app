<template>
  <div class="post-shared-container">
    <div class="post-detail-container">

        <div class="post-profile-image">
                <img :src="require('@/assets/user-image/user_image.png')" alt="user_image">
        </div>

        <div class="post-user-info">
            <div class="posted-date-container">
                <p class="posted-date-text">{{postItem.date}}</p>
            </div>
            <div class="posted-text-detail">
                <span class="posted-person-name">{{postItem.name}}</span> <span class="post-text-detail"> {{postItem.text}}</span>
            </div>
        </div>
    </div>

    <div class="post-action-container">
        <div class="post-evaluate-icons">
                <div class="icons-container" @click="setEvaluation('like')">
                     <img :src="require('@/assets/app_icon/feather-thumbs-up.svg')"  /> <span>{{postItem.like}}</span>
                </div>

                  <div class="icons-container" @click="setEvaluation('dislike')">
                    <img :src="require('@/assets/app_icon/feather-thumbs-down.svg')"  />
                     <span class="dislike-post-icon"></span> <span>{{postItem.dislike}}</span>
                </div>


        </div>

        <div class="post-controll-icons">
                 <div class="icons-container" @click="editPost">
                     <img :src="require('@/assets/app_icon/feather-edit-3.svg')"  />
                </div>

                  <div class="icons-container" @click="deletePost">
                     <img :src="require('@/assets/app_icon/feather-trash-2.svg')"  />
                </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        postItem:{
            default:{}
            
        }
    },

    data(){
        return {
                latestAction:''
        }
    },


    methods:{
        deletePost(){
            const postShared = JSON.parse(localStorage.getItem('postedDatas'));
            let modifiedPost = JSON.stringify(postShared.filter(post=>{
                return post.id != this.postItem.id
            }));

            localStorage.setItem('postedDatas',modifiedPost);
            
                window.dispatchEvent(
        new CustomEvent("postsModified", {
          detail: {
            posts: JSON.parse(localStorage.getItem("postedDatas")) ,
          },
        })
      );
            

        },

        editPost(){
                        window.dispatchEvent(
        new CustomEvent("postEditData", {
          detail: {
            post: this.postItem ,
          },
        })
      );
        },

       setEvaluation(actionName){

         const postShared = JSON.parse(localStorage.getItem('postedDatas'));
          
            let modifiedPost = JSON.stringify(postShared.map(post=>{
                if(post.id == this.postItem.id){
                    this.latestAction == actionName ? post[actionName]-- : post[actionName]++;
                }

                return post;
            }));
            this.latestAction = this.latestAction == actionName ? '' : actionName;
            localStorage.setItem('postedDatas',modifiedPost);
           
           
                window.dispatchEvent(
        new CustomEvent("postsModified", {
          detail: {
            posts: JSON.parse(localStorage.getItem("postedDatas")) ,
          },
        })
      );

        },

    }



}
</script>

<style  lang="scss" scoped>

.post-shared-container { 
width: 420px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000029;
border-radius: 5px;
opacity: 1;
display: flex;
flex-flow: column;
padding: 2% 0;

height: 118px;


.post-detail-container { 

    display: flex;
   
  
    justify-content: center;
    align-items: center;
    min-height: 75%;
    overflow: auto;
    

.post-profile-image {
        flex-basis: 25%;
      & img { 
        height: 100%;
 width: 40px;
background-size: cover;
background-repeat: no-repeat;

    }
}

.post-user-info { 
height: auto;
min-height: 40px;
    .posted-date-container { 
width: auto;
height: auto;
text-align: left;
display: flex;
flex-flow: column;


        .posted-date-text { 
            font: normal normal normal 8px/9px Roboto;
letter-spacing: 0px;
color: #99A4AE;
opacity: 1;
        }
    }

    .posted-text-detail {

width: 330px;
height: auto;
min-height: 32px;
/* UI Properties */
text-align: left;
letter-spacing: 0px;
opacity: 1;
        .posted-person-name { 
            color: #9B59B6;
        }

        .post-text-detail { 
            color: #5D6D7E;
        }
    }

}


  
}


.post-action-container { 

    display: flex;
    height: 25%;
    justify-content: space-between;
    align-items: center;
    border-top: .5px solid rgba(128, 128, 128, 0.384);
     width: 90%;
     margin: auto;

  



.post-evaluate-icons, .post-controll-icons    { 

display: flex;
justify-content: flex-end;
flex-flow: row;
gap: 48px;
width: max-content;
color: #C1C8CE;
span {
    font-size: 1rem;
  
}


 .icons-container { 
  
     
     display: flex;
    gap: 4px;
    width: 16px;
    height: 16px;

         img {
            height: 16px;
            width: 16px;

              &:hover{
              
              filter: drop-shadow(1px 1px 1px rgb(193, 218, 238));
              cursor: pointer;
    }
        }

 } 

}


.post-controll-icons { 

display: flex;
justify-content: flex-end;
flex-flow: row;
gap: 8px;

}







}



}


</style>