import {store} from "../store";
import {insMs} from "../service";

export default {
    setup() {
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
        }
        return {
            store: store,
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
                        <input class="form-control" v-model="store.state.ms_form.email">
                    </div>
                    <div class="form-group">
                        <label>電話:</label>
                        <input class="form-control" v-model="store.state.ms_form.phone">
                    </div>
                    <div class="form-group">
                        <label>圖片:</label>
                        <input class="form-control" type="file" @change="Img">
                    </div>
                    <div class="form-group">
                        <label>內容:</label>
                        <textarea class="form-control" v-model="store.state.ms_form.msg"></textarea>
                    </div>
                    <div class="form-group">
                        <label>序號</label>
                        <input class="form-control" v-model="store.state.ms_form.ord">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal" @click="submit">確定</button>
                </div>
            </div>
        </div>  
    </div>
    `,
    methods: {

    },
    computed: {

    },
    components: {

    }
}
