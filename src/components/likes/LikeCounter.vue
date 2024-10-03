<template>
  <div class="likeSection">
    <div v-if="isLoading" class="loading"></div>

    <button v-else-if="likeCount === 0" @click="likePost">
      Like it!
    </button>

    <button v-else @click="likePost">
      <span>Likes</span>{{" "}}
      <span>({{ likeCount }})</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

type Props = {
  postId: string;
};

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

const likePost = () => {
  console.log('Liked post 👍');
};

const getCurrentLikes = async () => {
  const response = await fetch(`/api/posts/likes/${props.postId}`);

  if (!response.ok) return;

  const { post } = await response.json();

  likeCount.value = post.likes;
  isLoading.value = false;
  
};

getCurrentLikes();
</script>

<style scoped>
  button {
    display: inline-block;
    width: fit-content;
    background-color: #5351bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  button:hover {
    background-color: #4a3f9a;
  }

  .likeSection {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .loading {
    width: 65px;
    height: 38px;
    background-color: #ccc;
    border-radius: 8px;
    animation: flashing 1s alternate infinite ease-in-out;
    opacity: 0.75;
  }

  @keyframes flashing {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
</style>