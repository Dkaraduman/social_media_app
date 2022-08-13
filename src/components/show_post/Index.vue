<template>
  <div class="shared-posts-container" v-if="postedAllItem.length">
    <Post
      v-for="(post, index) in postedAllItem"
      :postItem="post"
      :key="index"
    />
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  props: {
    postedAllItem: {
      default: [],
    },
  },
  components: {
    Post,
  },
};
</script>

<style scoped lang="scss">
.shared-posts-container {
  display: flex;
  margin-top: 80px;
  flex-flow: column;
  gap: 20px;
}
</style>