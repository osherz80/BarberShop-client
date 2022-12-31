import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/Main.vue';
import HoursView from '../views/Hours.vue';
import MapView from '../views/Map.vue';
import Reservation from '@/views/Reservation.vue';
import Admin from '@/views/Admin.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: MainView
  },
  {
    path: '/hours',
    name: 'opening-hours-view',
    component: HoursView
  },
  {
    path: '/map',
    name: 'map-view',
    component: MapView
  },
  {
    path: '/reservation',
    name: 'reservation-view',
    component: Reservation
  },
  {
    path: '/admin',
    name: 'admin-view',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
