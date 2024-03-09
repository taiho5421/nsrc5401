export default {
    props: ['st', 'ed', 'rmNum', 'rm'],
    emits: ['set:rmNum', 'update:rmNum'],
    setup(props, { emit }) {
        let days = Vue.computed(() => {
            if (props.st !== null && props.ed !== null) {
                let st = new Date(props.st)
                let ed = new Date(props.ed)
                const time = ed.getTime() - st.getTime()
                return Math.ceil(time / (1000 * 3600 * 24)) + 1
            } else if (props.st !== null && props.ed === null) {
                return 1
            }
        })
        let checkDay = Vue.computed(() => {
            return days.value > 1
        })
        let chooseRm = () => {
            emit('update:rmNum')
        }
        let localRmNum = Vue.ref(props.rmNum)
        Vue.watch(() => props.rmNum, (newVal) => {
            localRmNum.value = newVal
        })
        Vue.watch(localRmNum, (newVal) => {
            emit('set:rmNum', newVal)
        })
        return {
            props,
            days,
            checkDay,
            chooseRm,
            localRmNum
        }
    },
    template: `
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">訂房間數:</label>
        </div>
        <input class="form-control" type="number" :disabled="!checkDay" v-model="localRmNum" min="1" max="8">
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">入住天數:</label>
        </div>
        <input class="form-control" type="number" v-model="days" disabled>
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">入住時間:</label>
        </div>
        <input class="form-control" type="date" v-model="props.st" disabled>
        <input class="form-control" type="date" v-model="props.ed" disabled>
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">房號:</label>
        </div>
        <input class="form-control" type="text" v-model="props.rm" disabled>
        <div class="input-group-append">
            <button class="btn btn-primary" @click="chooseRm" :disabled="!checkDay">自動</button>
            <button class="btn btn-primary" data-toggle="modal" data-target="#chRm" :disabled="checkDay">選擇</button>
        </div>
    </section>
    `,
}
