import {store} from "../store";
import sign from "../views/sign/sign.js";

export default {
    setup() {


        return {
            store: store,

            sign_state: () => store.mutations.sign_state(store, true),
            currentLayout: (layout) => store.mutations.currentLayout(store,layout),
        }
    },
    template: `
    <header>
        <div class="jumbotron text-center bg-light m-0">
            <h1>{{store.state.web.title}}</h1>
            <p>{{store.state.web.subtitle}}</p>
        </div> 
        <nav class="navbar navbar-expand navbar-dark bg-secondary">
            <a class="navbar-brand" href="#" @click="currentLayout('Home')">首頁</a>
            <button class="btn btn-outline-danger rounded-pill ml-auto" @click="currentLayout('Home')">返回</button>
        </nav>
    </header>
    <main class="container card my-5 p-3 col-3">
        <sign v-if="store.state.web.view === 'sign'" />
    </main>
    <footer>
        
    </footer>
    `,
    methods: {

    },
    computed: {

    },
    components: {
        sign
    }
}
