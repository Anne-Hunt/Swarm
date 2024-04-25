<script setup>
import { Comment } from '../models/Comment.js';

defineProps({comment: Comment})
</script>


<template>
<div class="row">
    <div class="col-2"><img :src="comment.creator.picture" :alt="comment.creator.name"><p>{{ comment.creator.name }}</p></div>
    <div class="col-10">{{ comment.body }}</div>
</div>
</template>


<style lang="scss" scoped>

</style>