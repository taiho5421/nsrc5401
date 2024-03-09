export default {
    props: ['st', 'day', 'rm', 'rmNum'],
    setup(props, { emit }) {
        let selectedRoom = Vue.ref([]);

        const selectRoom = (roomIndex) => {
            if (!selectedRoom.value.includes(roomIndex)) {
                selectedRoom.value.push(roomIndex)
            } else {
                const index = selectedRoom.value.indexOf(roomIndex);
                if (index > -1) {
                    selectedRoom.value.splice(index, 1)
                }
            }
            emit('update:rm', selectedRoom.value)
        }
        let checkCh = Vue.computed(() => {
            return selectedRoom.value.length > 0
        })
        let reCh = () => {
            selectedRoom.value = []
            emit('update:rm', selectedRoom.value)
        }
        return {
            props,
            selectedRoom,
            checkCh,
            reCh,
            selectRoom
        };
    },
    template: `
    <div class="modal fade" v-if="props.st !== null">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>選擇房間</h4>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between my-2">
                            <button class="card align-items-center justify-content-center" v-for="i in 4" style="width: 6rem;height: 6rem" 
                                :class="{'bg-warning': selectedRoom.includes(i), 'bg-danger': props.day.find(item => item.date === props.st).room[i - 1] === '1'}"
                                :disabled=" props.day.find(item => item.date === props.st).room[i - 1] === '1'" 
                                @click="selectRoom(i)">
                                <p>房間 {{ i }}</p>
                            </button>
                        </div>
                        <div class="d-flex flex-row justify-content-between my-2">
                            <button class="card align-items-center justify-content-center" v-for="i in 4" style="width: 6rem;height: 6rem" 
                                :class="{'bg-warning': selectedRoom.includes(i + 4), 'bg-danger': props.day.find(item => item.date === props.st).room[i + 3] === '1'}"
                                :disabled=" props.day.find(item => item.date === props.st).room[i + 3] === '1'" 
                                @click="selectRoom(i + 4)">
                                <p>房間 {{ i + 4 }}</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal" :disabled="!checkCh">確定選取</button>
                    <button class="btn btn-warning" @click="reCh">取消選取</button>
                    <button class="btn btn-danger" data-dismiss="modal"  @click="reCh">放棄離開</button>
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
