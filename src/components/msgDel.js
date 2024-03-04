import {delMs} from "../service";

export default {
    props: ['form'],
    setup(props) {
        let ms = Vue.inject('ms')
        let submit = () => {
            delMs(props.form).then(res => { ms.value = res })
        }

        return {
            props: props,
            submit: submit,
        }
    },
    template: `
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>刪除</h4>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                
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
