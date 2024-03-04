import {store} from "../store";
import {insMs} from "../service";

export default {
    setup() {
        let check = Vue.ref({
            email: false,
            phone: false,
            ord: false,
        })
        let Img = (event) => {
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = () => {
                store.state.ms_form.img = reader.result
            }
            reader.readAsDataURL(file)
        }
        let ms = Vue.inject('ms')
        let submit = () => {
            insMs(store.state.ms_form).then(res => { ms.value = res })
            Object.keys(store.state.ms_form).forEach(key => { store.state.ms_form[key] = null })
        }
        return {
            store: store,
            check: check,
            Img: Img,
            submit: submit,
        }
    },
    template: `
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>新增</h4>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>姓名:</label>
                        <input class="form-control" v-model="store.state.ms_form.name">
                    </div>
                    <div class="form-group">
                        <label>信箱:</label>
                        <input class="form-control" v-model="store.state.ms_form.email" @input="checkEmail">
                    </div>
                    <div class="form-group">
                        <label>電話:</label>
                        <input class="form-control" v-model="store.state.ms_form.phone" @input="checkPhone">
                    </div>
                    <div class="form-group custom-file">
                        <label class="custom-file-label">圖片上傳</label>
                        <input class="form-control custom-file-input" type="file" @change="Img">
                    </div>
                    <div class="form-group">
                        <label>內容:</label>
                        <textarea class="form-control" v-model="store.state.ms_form.msg"></textarea>
                    </div>
                    <div class="form-group">
                        <label>序號</label>
                        <input class="form-control" v-model="store.state.ms_form.ord" @input="checkOrd">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal" @click="submit" :disabled="!checks">確定</button>
                </div>
            </div>
        </div>  
    </div>
    `,
    methods: {
        checkEmail () {
            this.check.email = /^[^@]+@[^.]+\..+$/.test(store.state.ms_form.email)
        },
        checkPhone () {
            this.check.phone = /^[\d|-]+$/.test(store.state.ms_form.phone)
        },
        checkOrd () {
            this.check.ord = /^\d{4}$/.test(store.state.ms_form.ord)
        }
    },
    computed: {
        checks () {
            return this.check.email === true && this.check.phone === true && this.check.ord === true
        }
    },
    components: {

    }
}
