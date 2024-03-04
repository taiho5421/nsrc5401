import {updMs} from "../service";

export default {
    props: ['form'],
    setup(props) {
        let check = Vue.ref({
            email: true,
            phone: true,
            ord: true,
        })
        let Img = (event) => {
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = () => {
                props.form.img = reader.result
            }
            reader.readAsDataURL(file)
        }
        let ms = Vue.inject('ms')
        let submit = () => {
            updMs(props.form).then(res => { ms.value = res })
        }
        return {
            props: props,
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
                    <h4>編輯</h4>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>姓名:</label>
                        <input class="form-control" v-model="props.form.name">
                    </div>
                    <div class="form-group">
                        <label>信箱:</label>
                        <select class="ml-2 form-control form-control-sm col-2 d-inline" v-model="props.form.email_show">
                            <option value="1">顯示</option>
                            <option value="0">隱藏</option>
                        </select>
                        <input class="form-control" v-model="props.form.email" @input="checkEmail">
                    </div>
                    <div class="form-group">
                        <label>電話:</label>
                        <select class="ml-2 form-control form-control-sm col-2 d-inline" v-model="props.form.phone_show">
                            <option value="1">顯示</option>
                            <option value="0">隱藏</option>
                        </select>
                        <input class="form-control" v-model="props.form.phone" @input="checkPhone">
                    </div>
                    <div class="form-group custom-file">
                        <label class="custom-file-label">圖片上傳</label>
                        <input class="form-control custom-file-input" type="file" @change="Img">
                    </div>
                    <div class="form-group">
                        <label>內容:</label>
                        <textarea class="form-control" v-model="props.form.msg"></textarea>
                    </div>
                    <div class="form-group">
                        <label>序號</label>
                        <input class="form-control" v-model="props.form.ord" @input="checkOrd">
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
            this.check.email = /^[^@]+@[^.]+\..+$/.test(this.props.form.email)
        },
        checkPhone () {
            this.check.phone = /^[\d|-]+$/.test(this.props.form.phone)
        },
        checkOrd () {
            this.check.ord = /^\d{4}$/.test(this.props.form.ord)
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
