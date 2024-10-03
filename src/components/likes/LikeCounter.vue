<template>
  <button @click="likePost">Like</button>
</template>

<script lang="ts" setup>
  const likePost = () => {
    console.log('Liked post 👍');
  };
</script>

<style scoped>
  button {
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
</style>