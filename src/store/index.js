import {getMs} from "../service";

export const store = Vue.reactive({
    state: {
        login: {
            account: 'admin',
            password: 1234
        },
        web: {
            title: '快樂旅遊網',
            subtitle: '快樂的旅遊 快樂的旅遊 快樂的旅遊',
            manage: false,
            layout: 'Home',
            view: 'msg'
        },
        ms_form: {
            name: null,
            email: null,
            phone: null,
            msg: null,
            img: null,
            ord: null,
        }
    },
    mutations: {
        sign_state (store, state) {
            store.state.web.manage = state
            if (state === true)
                this.currentLayout(store, 'VueHome')
        },
        currentLayout (store, layout) {
            store.state.web.layout = layout
            if (layout === 'Home')
                store.state.web.view = 'home'
            else
                store.state.web.view = 'sign'
        },
        currentView (store, view) {
            store.state.web.view = view
        }
    }
})