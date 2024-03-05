import {store} from "../../store";
import {reCha} from "../../service";

export default {
    setup() {
        let ms = Vue.ref(0);
        reCha().then(res => { ms.value = res })
        let login = Vue.ref({
            account: 'admin',
            password: '1234'
        })
        let input = Vue.ref({
            account: null,
            password: null,
            captcha: []
        })
        let submit = () => {
            if (input.value.account === login.value.account && input.value.password === login.value.password)
                store.mutations.sign_state(store, true)
            else
                window.alert('登入失敗')
        }
        let cls = () => {
            input.value.account = null
            input.value.password = null
        }
        let set =  () => {
            reCha().then(res => { ms.value = res })
        }
        return {
            login: login,
            input: input,
            submit: submit,
            cls: cls,
            set: set,
            ms: ms,
        }
    },
    template: `
    <article class="text-center">
        <h2>登入系統</h2>
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
            <img :src="'../../../php/img.php?i=' + t + '&' + ms" v-for="t in [0,1,2,3]" class="img" v-draggable="t">
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

    },
    computed: {

    },
    components: {

    },
    directives: {
        draggable: {
            mounted (el, bind) {
                $(el).draggable({
                    revert: true,
                    cursor: 'grabbing',
                    drag (_, ui) {
                        ui.helper.data('value', bind.value)
                    }
                })
            },
            beforeUnmount (el, bind) {
                $(el).draggable('destroy')
            }
        },
        droppable: {
            mounted (el, bind) {
                $(el).droppable({
                    hoverClass: 'ui-state-hover',
                    drop (_, ui) {
                        bind.instance.input.captcha[bind.value] = ui.helper.data('value')
                    }
                })
            },
            beforeUnmount (el, bind) {
                $(el).droppable('destroy')
            }
        }
    }
}
