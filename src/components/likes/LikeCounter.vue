<template>
  <div class="likeSection">
    <div v-if="isLoading" class="loading"></div>
    <button v-else-if="likeCount === 0" @click="likePost">
      Like it!
    </button>

    <button v-else @click="likePost">
      <span>Likes</span>{{" "}}
      <span class="like-count">{{ likeCount }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';

type Props = {
  postId: string;
};

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, async () => {
  await fetch(`/api/posts/likes/${props.postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: likeClicks.value }),
  });

  likeClicks.value = 0;
});

const likePost = () => {
  likeCount.value++;
  likeClicks.value++;

  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  })
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
  .likeSection {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    background-color: #5351bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    height: auto;
  }

  .like-count {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(310, 80%, 50%);
    padding: 5px;
    border-radius: 50%;
    font-weight: 500;
  }

  button:hover {
    background-color: #4a3f9a;
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