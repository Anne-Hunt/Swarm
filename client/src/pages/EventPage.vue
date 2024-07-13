<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { eventService } from '../services/EventService.js';
import { commentService } from '../services/CommentService.js';
import { ticketService } from '../services/TicketService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { AuthService } from '../services/AuthService.js';

const activeEvent = computed(()=> AppState.activeEvent)
// const eventType = AppState.activeEvent?.type
const eventImg = computed(()=> `url(${AppState.activeEvent?.coverImg})`)
const comments = computed(()=>AppState.comments)
const tickets = computed(()=> AppState.eventTickets)
const userProfile = computed(()=> AppState.account)
const userTicket = computed(()=> AppState.eventTickets.find(eventTicket => eventTicket.accountId == AppState.account.id))
const attending = computed(()=> ((userTicket.value.accountId == userProfile.value.id) ? `You are attending!` : `Get a ticket before it is too late`))
const soldOutText = `SOLD OUT`
const ticketAvailable = `TICKETS AVAILABLE`
const soldOut = computed(()=> ((AppState.activeEvent.capacity == AppState.activeEvent.ticketCount) ? soldOutText : ticketAvailable))
// const soldOutTickets = computed(()=> (if(AppState.activeEvent.capacity == AppState.activeEvent.ticketCount) return soldOutText))
const route = useRoute()


async function getActiveEvent(){
try {
    const eventId = route.params.eventId
    await eventService.setActiveEvent(eventId)
    logger.log("found event", AppState.activeEvent)
} catch (error) {
    Pop.toast('Unable to load Event', 'error')
    logger.log('Unable to load event', error)
}
}

async function getComments(){
    try {
        const eventId = route.params.eventId
        await commentService.getComments(eventId)
    } catch (error) {
        Pop.toast('Unable to load comments', 'error')
        logger.log('Unable to load comments', error)
    }
}

function resetComputed(){
    AppState.usersTickets = [],
    AppState.activeEvent = null,
  AppState.userEvents= [],
  AppState.profiles= [],
  AppState.eventTickets = []
}

async function createTicket(){
    try {
        const ticketData = {eventId: route.params.eventId}
        await ticketService.createTicket(ticketData)
        Pop.success("You have a ticket!")
        await this.getTickets()
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

async function getUserTicket(){
    try {
        await ticketService.getUserTickets()
    } catch (error) {
        logger.log('unable to find ticket', 'error')
    }
}

async function deleteTicket(){
    try {
        await Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        const ticket = AppState.eventTickets.find(ticket => ticket.accountId == AppState.account.id)
        const ticketId = ticket.id
        await ticketService.deleteTicket(ticketId)
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}

async function cancelEvent(){
        try {
            const confirmation = await Pop.confirm('Do you want to cancel your event?')
            if(!confirmation) return
            const eventId = route.params.eventId
            await eventService.cancelEvent(eventId)
        } catch (error) {
            Pop.toast('unable to cancel', 'error')
        logger.log('Unable to cancel', error)
        }
    }

async function getAllTickets(){
  try {
        await ticketService.getAllTickets()
        const tickets = AppState.tickets.filter(ticket => AppState.activeEvent.id == ticket.eventId)
        AppState.eventTickets = tickets
  } catch (error) {
        Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

async function login() {
  AuthService.loginWithPopup()
}

onBeforeMount(()=>{
})

onMounted(()=>{
    getActiveEvent()
    getComments()
    getUserTicket()
    getAllTickets()
})

onUnmounted(()=>{
    resetComputed()
})
</script>


<template>
    <section class="row justify-content-center my-2 p-0 mx-0">
        <div v-if="activeEvent" class="col-12 col-md-8">
            <section class="row bgimage flex-column justify-content-between rounded p-0 m-0 shadow">
                <span v-if="activeEvent.isCanceled === true" class=" text-light"><h3><strong>CANCELED</strong></h3></span>
                <span v-else class="text-light fontfix"><h3><strong>{{ soldOut }}</strong></h3></span>
                <span class="text-light fontfix type"><strong>{{ activeEvent?.type }}</strong></span>
            </section>
            <section class="row mb-2">
                <div class="col-8 p-2">
                    <div class="row justify-content-between align-items-center mt-2">
                            <div class="col-9"><h2>{{ activeEvent?.name }}</h2></div>
                        <div v-if="activeEvent.creatorId == userProfile?.id" class="col-3 text-end">
                            <div class="dropdown">
                                <div class="dropdown-toggle btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal fs-1 text-warning fontfix"></i></div>
                                <ul class="dropdown-menu">
                                    <li><button class="dropdown-item"  @click="cancelEvent">Cancel Event</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeEvent" class="row">
                        <div class="col-12">
                            <p> {{ activeEvent?.description }}</p>
                            <p><span class="fs-5 pe-2">Date</span>{{ activeEvent?.startDate }}</p>
                            <p><span class="fs-5 pe-2">Location</span>{{ activeEvent?.location }}</p>
                        </div>
                    </div>
                    <section class="row p-0 mb-1 rounded border border-info shadow">
                        <div class="bg-info pt-2 rounded-top" v-if="AppState.account">
                            <h5 class="text-light fontfix">Comments</h5>
                            <CommentForm/>
                        </div>
                        <div class="bg-info pt-2 rounded-top btn" v-else>
                            <h5 class="text-light fontfix" @click="login">Sign in to leave a comment!</h5>
                        </div>
                        <div v-for="comment in comments" :key="comment.id">
                            <CommentCard :comment="comment"/>
                        </div>
                    </section>
                </div>
                <div class="col-4 p-2">
                    <div v-if="AppState.account">
                        <div v-if="userTicket?.accountId == userProfile.id" class="bg-success rounded p-2 shadow">
                            <h4>{{ attending }}</h4>
                            <button class="btn btn-warning btn-outline-dark" @click="deleteTicket">Cancel</button>
                        </div>
                        <div v-if="activeEvent.isCanceled === false && activeEvent.capacity != activeEvent.ticketCount && userTicket?.accountId != userProfile.id" class="bg-info text-light fontfix rounded p-2 shadow">
                            <h4>Wanna go?</h4>
                            <p>Claim your spot!</p>
                            <button v-if="activeEvent.isCanceled === false && activeEvent.capacity != activeEvent.ticketCount && userTicket?.accountId != userProfile.id" class="btn btn-warning border text-end" type="button" @click="createTicket">Ticket</button>
                        </div>
                    </div>
                    <div v-if="!userProfile" class="bg-info text-light fontfix rounded p-2 shadow">
                        <h4>Sound fun?</h4>
                        <p>Get a ticket here.</p>
                        <button class="btn btn-warning border text-end" type="button" @click="login">Sign in!</button>
                    </div>
                    <div class="bg-warning mt-2 rounded shadow">
                        <div class="rounded p-2 container-fluid">
                            <p class="text-dark"><strong>Attendees</strong></p>
                            <div v-for="ticket in tickets" :key="ticket.id">
                                <TicketHoldersCard :ticket="ticket"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </section>
    <div>

    </div>
</template>


<style lang="scss" scoped>
.bgimage{
  background-color: black;
  background-image: v-bind(eventImg);
  width: 100%;
  background-position: center;
  height: 40dvh;
  background-size: cover;
}

.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

.fontfix{
text-shadow: 1px 1px 4px black;
}

.ticketHolder{
    max-height: 25px;
}

.type{
    text-transform: uppercase;
}
</style>