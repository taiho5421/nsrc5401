import {store} from "../../store";

export default {
    setup() {
        let login = {
            account: 'admin',
            password: '1234'
        }
        let input = {
            account: null,
            password: null,
        }
        let submit = () => {
            if (input.account === login.account && input.password === login.password)
                store.mutations.sign_state(store, true)
            else
                window.alert('登入失敗')
        }
        return {
            login: login,
            input: input,
            submit: submit
        }
    },
    template: `
    <article class="text-center">
        <h2>登入系統</h2>
        {{input}}
    </article>
    <article class="">
        <section class="form-group">
            <label>帳號:</label>
            <input class="form-control" v-model="input.account">
        </section>
        <section class="form-group">
            <label>密碼:</label>
            <input class="form-control" v-model="input.password">
        </section>
        <section class="form-group">
            <label>驗證:</label>
            <input class="form-control">
        </section>
    </article>
    <article class="d-flex justify-content-between">
        <button class="btn btn-outline-secondary rounded-pill" @click="cls">清除</button>
        <button class="btn btn-success rounded-pill w-25" @click="submit">送出</button>
        <button class="btn btn-outline-secondary rounded-pill" @click="set">重置</button>
    </article>
    `,
    methods: {
        cls () {
            this.input.account = null
            this.input.password = null
        },
        set () {
            console.log('err')
        }
    },
    computed: {

    },
    components: {

    }
}
