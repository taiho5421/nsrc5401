import {insRm} from "../service";

export default {
    props: ['data'],
    setup (props) {
        let check = Vue.ref({
            email: false,
            phone: false,
        })
        let data = Vue.ref({
            rmNum: props.data.rmNum,
            days: props.data.days,
            rm: props.data.rm,
            st_date: props.data.st,
            ed_date: props.data.ed,
            total: props.data.total,
            deposit: props.data.deposit,
            create_at: new Date().toISOString().slice(0, 10),
            name: null,
            email: null,
            phone: null,
            note: null
        })
        let checkEmail = () => {
            check.value.email = /^[^@]+@[^.]+\..+$/.test(data.value.email)
        }
        let checkPhone = () => {
            check.value.phone = /^[\d|-]+$/.test(data.value.phone)
        }
        let checks = Vue.computed(() => {
            return check.value.email === true && check.value.phone === true
        })
        let rm = Vue.inject('rm')
        let send = () => {
            insRm(data.value).then(res => { rm.value = res })
        }
        return {
            data,
            checkPhone,
            checkEmail,
            checks,
            send
        }
    } ,
    template: `
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>新增</h4>
                    <button class="close" data-dismiss="modal">&times</button>
                </div>
                <div class="modal-body">
                {{ data }}
                    <section class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text">姓名:</label>
                        </div>
                        <input class="form-control" v-model="data.name">
                    </section>
                    <section class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text">信箱:</label>
                        </div>
                        <input class="form-control" v-model="data.email" @input="checkEmail">
                    </section>
                    <section class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text">電話:</label>
                        </div>
                        <input class="form-control" v-model="data.phone" @input="checkPhone">
                    </section>
                    <section class="input-group mb-2">
                        <div class="input-group-prepend">
                            <label class="input-group-text">備註:</label>
                        </div>
                        <input class="form-control" v-model="data.note">
                    </section>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal" :disabled="!checks" @click="send">確定</button>
                </div>    
            </div>
        </div>
    </div>
    `
}
