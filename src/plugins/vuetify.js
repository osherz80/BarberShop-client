import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
    componentPrefix: 'vc',
    screens: {
        tablet: '576px',
        laptop: '992px',
        desktop: '1200px',
    },
});

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
});
