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
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Leave a Comment" aria-label="Comment input and button" aria-describedby="button-addon1" v-model="commentFormData.body">
                <button class="btn btn-outline-dark bg-warning" type="submit" id="button-addon1">Comment</button>
            </div>
        </form>
</template>


<style lang="scss" scoped>

</style>