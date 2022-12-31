import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        isRegistered: false,
        PersonInfo: {},
        appointmentsTimesList: [],
        miutesBetweenAppointments: 30,
        treatmentsList: [],
        showNavIocn: false,
        workingHours: [
            {
                name: "ראשון",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "שני",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "שלישי",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "רביעי",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "חמישי",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "שישי",
                open: 8,
                close: 19,
                isOpen: true,
            },
            {
                name: "שבת",
                open: 8,
                close: 19,
                isOpen: false,
            },

        ],
    },
    mutations: {
        CHANGE_IS_REGISTERED(state, registered) {
            state.isRegistered = registered;
        },
        INIT_PERSON_INFO(state, info) {
            state.PersonInfo = info;
        },
        INIT_TREATMENTS_LIST(state, list) {
            state.treatmentsList = list;
        },
        OPEN_WORKING_DAY(state, index) {
            state.workingHours[index].isOpen = true;
        },
        CLOSE_WORKING_DAY(state, index) {
            state.workingHours[index].isOpen = false;
        },
        CHANGE_WORKING_DAY_HOURS(state, { index, open, close }) {
            console.log('in mutate', index, open, close);
            console.log('before mutate', state.workingHours);
            state.workingHours[index].open = open;
            state.workingHours[index].close = close;
            console.log('after mutate', state.workingHours);
        },
    },
    actions: {
        ChangeIsRegistered(context, registered) {
            context.commit('CHANGE_IS_REGISTERED', registered);
        },
        initPersonInfo(context, info) {
            context.commit('INIT_PERSON_INFO', info);
        },
        initTreatmentsList(context, list) {
            context.commit('INIT_TREATMENTS_LIST', list);
        },
        changeDayOpen(context, index, openHour) {
            context.commit('CHANGE_WORKING_DAY_OPEN_HOUR', index, openHour);
        },
        changeDayHours(context, { index, open, close }) {
            console.log('in action', index, open, close);
            context.commit('CHANGE_WORKING_DAY_HOURS', { index, open, close });
        },
        openDay(context, index) {
            context.commit('OPEN_WORKING_DAY', index);
        },
        closeDay(context, index) {
            context.commit('CLOSE_WORKING_DAY', index);
        }
    }
})