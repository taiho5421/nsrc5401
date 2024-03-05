export default {
    setup() {

        return {

        }
    },
    template: `
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>選擇房間</h4>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div>Room</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal">確定選取</button>
                    <button class="btn btn-warning">取消選取</button>
                    <button class="btn btn-danger" data-dismiss="modal">放棄離開</button>
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
