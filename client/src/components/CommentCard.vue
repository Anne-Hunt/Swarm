<script setup>
import { Comment } from '../models/Comment.js';

defineProps({comment: Comment})
</script>


<template>
<div class="row align-items-center p-2 border-top border-dark">
    <div class="col-3 text-center"><img class="commentImg rounded-circle border border-2 border-dark justify-self-center" :src="comment.creator.picture" :alt="comment.creator.name">
        <p>{{ comment.creator.name }}</p></div>
    <div class="col-9">{{ comment.body }}</div>
</div>
</template>


<style lang="scss" scoped>
.commentImg{
    max-height: 30px;
}
</style>