<template>
  <div class="post-creater-container">
    <div class="form-container">
      <textarea
        v-model.lazy="postInfo.text"
        name="postText"
        class="post-text"
        placeholder="Your text here"
        rows="6"
      ></textarea>
      <div class="post-action-container">
        <div class="post-content-controller">
          <span class="media-selecter"> </span>

          <span class="icon-selecter"> </span>
        </div>

        <div class="submit-post" v-on ="{click : mode == 'post' ? submitPost : editPost}" >
          <button  class="post-submit-button">{{ mode == 'post' ? 'SUBMIT' : 'EDIT'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createRandomId from "@/helpers/createRandomId";
export default {
  emits: ["updateMyPosts"],
  data() {
    return {
      postInfo: {
        id: "",
        text: "",
        name: "Jane Doe",
        date:'',
        like: 0,
        dislike: 0,
      },

      mode:'post'
    };
  },

      mounted() {
  window.addEventListener('postEditData', (event) => {
    this.postInfo = event.detail.post;
    this.mode = 'edit';
  });
      },

  methods: {
    submitPost() {
        
      this.postInfo.id = createRandomId();
      const postedItemsContainer = JSON.parse(
        localStorage.getItem("postedDatas")
      );
      let dateNow = new Date();
      this.postInfo.date = dateNow.toLocaleString()
      postedItemsContainer.push(this.postInfo);
      localStorage.setItem("postedDatas", JSON.stringify(postedItemsContainer));

      window.dispatchEvent(
        new CustomEvent("postsModified", {
          detail: {
            posts: JSON.parse(localStorage.getItem("postedDatas")),
          },
        })
      );
      this.$nextTick(() => {
        this.postInfo.text = "";
      });
    },

    editPost(){
        
        const postedItemsContainer = JSON.parse(localStorage.getItem("postedDatas"));
        let editedPost = postedItemsContainer.map(post => {

            if(post.id == this.postInfo.id){
                post = this.postInfo ;
            }

            return post ;
        })

        

        localStorage.setItem("postedDatas", JSON.stringify(editedPost));
             window.dispatchEvent(
        new CustomEvent("postsModified", {
          detail: {
            posts: JSON.parse(localStorage.getItem("postedDatas")),
          },
        })
      );
      this.$nextTick(() => {
        this.mode = 'post'
        this.postInfo.text = "";
      });
        
    }
  },
};
</script>

<style scoped lang="scss">
.post-creater-container {
  position: relative;
  display: flex;
  align-items: center;
  top: 50px;
  width: 420px;
  height: 178px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;

  .form-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    gap: 16px;

    .post-text {
      width: 99%;
      border: 0;
      height: 72px;
      /* UI Properties */
      text-align: left;
      font: normal normal normal 14px/16px Roboto;
      letter-spacing: 0px;
      color: #66696b;
      padding-top: 6px;
      padding-left: 6px;
      opacity: 1;

      &:focus {
        outline: 0.5px solid #c1c8ce;
        border-radius: 6px;
      }
    }

    .post-action-container {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .post-content-controller {
        display: flex;
        gap: 16px;
        align-items: center;
        height: 32px;

        .media-selecter {
          width: 8px;
          height: 16px;
          /* UI Properties */
          background: transparent url("@/assets/app_icon/ionic-ios-attach.svg")
            0% 0% no-repeat padding-box;

          &:hover {
            filter: drop-shadow(1px 1px 1px rgb(193, 218, 238));
            cursor: pointer;
          }
        }

        .icon-selecter {
          width: 16px;
          height: 16px;
          /* UI Properties */
          background: transparent url("@/assets/app_icon/feather-smile.svg") 0%
            0% no-repeat padding-box;

          &:hover {
            filter: drop-shadow(1px 1px 1px rgb(193, 218, 238));
            cursor: pointer;
          }
        }
      }

      .submit-post {
        width: 108px;
        height: 36px;
        /* UI Properties */
        background: #9b59b6 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #8e44ad29;
        border-radius: 5px;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background: #30173a 0% 0% no-repeat padding-box;
        }

        .post-submit-button {
          font: normal normal medium 14px/16px Roboto;
          letter-spacing: 1.4px;
          color: #ffffff;
          text-transform: uppercase;
          background: transparent;
          border: 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>