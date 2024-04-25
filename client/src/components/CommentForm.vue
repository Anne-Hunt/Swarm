<script setup>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { commentService } from '../services/CommentService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';

defineProps({comment: Comment})

const route = useRoute()
const account = computed(()=> AppState.account)

const commentFormData = ref({
    body: '',
    eventId: route.params.eventId,
    creatorId: account.value.id
})
async function createComment(){
    try {
        const commentData = commentFormData.value
        const comment = await commentService.createComment(commentData)
        logger.log('comment returned', comment)
        resetForm()
    } catch (error) {
        Pop.toast('Unable to post comment', 'error')
        logger.log('Unable to post comment', error)
    }
}

function resetForm(){
    commentFormData.value = {body: '', eventId: route.params.eventId, creatorId: account.value.id}
}
</script>


<template>
<form @submit.prevent="createComment">
    <div class="form-floating">
        <label class="form-label" for="commentBody">Leave a Comment</label>
        <input class="form-control" type="text" name="body" id="commentBody" v-model="commentFormData.body">
    </div>
    <button type="submit" class="btn btn-primary small rounded-pill"><small>SUBMIT</small></button>
</form>
</template>


<style lang="scss" scoped>

</style>