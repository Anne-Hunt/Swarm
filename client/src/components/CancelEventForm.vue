<script setup>

</script>


<template>
    <form >

        <div class="d-flex align-items-center mb-3">
            <input v-model="meetData.isCanceled" type="checkbox" class="form-check-input" name="isCanceled" id="eventCancel" unchecked required/>
            <label class="form-check-label" for="eventCancel">Cancel Event?</label>
        </div>
    </form>
</template>


<style lang="scss" scoped>

</style>