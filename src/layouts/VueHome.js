import {store} from "../store";
import home from "../views/home/home.js";
import msg from "../views/home/msg.js";
import room from "../views/home/room.js";
import meal from "../views/home/meal.js";
import traffic from "../views/home/traffic.js";
import manage from "../views/home/manage.js";

export default {
    setup() {


        return {
            store: store,

            sign_state: () => store.mutations.sign_state(store, false),
            currentLayout: (layout) => store.mutations.currentLayout(store,layout),
            currentView: (view) => store.mutations.currentView(store, view)
        }
    },
    template: `
    <header>
        <div class="jumbotron text-center bg-light m-0">
            <h1>{{store.state.web.title}}</h1>
            <p>{{store.state.web.subtitle}}</p>
        </div> 
        <nav class="navbar navbar-expand navbar-dark bg-secondary">
            <a class="navbar-brand" href="#" @click="currentView('home')">首頁</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="currentView('msg')">訪客留言</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="currentView('room')">線上訂房</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="currentView('meal')">線上訂餐</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="currentView('traffic')">交通資訊</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="currentView('manage')" v-if="store.state.web.manage === true">網站管理</a>
                </li>
            </ul>
            <button class="btn btn-success rounded-pill ml-auto" @click="currentLayout('Sign')" v-if="store.state.web.manage !== true">登入</button>
            <button class="btn btn-danger rounded-pill ml-auto" @click="sign_state" v-if="store.state.web.manage === true">登出</button>
        </nav>
    </header>
    <main class="container card my-5 p-0">
        <home v-if="store.state.web.view === 'home'" />
        <msg v-if="store.state.web.view === 'msg'" />
        <room v-if="store.state.web.view === 'room'" />
        <meal v-if="store.state.web.view === 'meal'" />
        <traffic v-if="store.state.web.view === 'traffic'" />
        <manage v-if="store.state.web.view === 'manage'" />
    </main>
    <footer>
        
    </footer>
    `,
    methods: {

    },
    computed: {

    },
    components: {
        home,
        msg,
        room,
        meal,
        traffic,
        manage
    }
}
