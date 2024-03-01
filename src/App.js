import {store} from "./store";
import {getMs, getRm} from "./service";
import VueHome from "./layouts/VueHome.js";
import VueSign from "./layouts/VueSign.js";

export default {
    setup() {
        let ms = Vue.ref(null)
        let rm = Vue.ref(null)
        Vue.provide('ms', ms)
        Vue.provide('rm', rm)
        getMs().then(res => { ms.value = res })
        getRm().then(res => { rm.value = res })

        return {
            store: store
        }
    },
    template: `
    <VueHome v-if="store.state.web.layout === 'Home'" />
    <VueSign v-if="store.state.web.layout === 'Sign'" />
    `,
    methods: {

    },
    computed: {

    },
    components: {
        VueHome,
        VueSign,
    }
}
