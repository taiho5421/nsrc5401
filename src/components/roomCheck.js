import roomIns from "./roomIns.js";

export default {
    props: ['st', 'ed', 'rm'],
    setup (props, { emit }) {
        let st = props.st.toISOString().slice(0, 10)
        let ed = props.ed == null ? st : props.ed.toISOString().slice(0, 10)
        let rmNum = props.rm.length

        let stDate = new Date(props.st)
        let edDate = new Date(props.ed == null ? st : props.ed)
        const time = edDate.getTime() - stDate.getTime()
        let days = Math.ceil(time / (1000 * 3600 * 24)) + 1
        let total = days * rmNum * 5000
        let deposit = total * .3
        let sendData = {
            rmNum: rmNum,
            days: days,
            rm: props.rm,
            st: st,
            ed: ed,
            total: total,
            deposit: deposit,
        }
        let abolish = () => {
            emit('update:rm')
        }
        return {
            st,
            ed,
            days,
            rmNum,
            total,
            deposit,
            props,
            sendData,
            abolish
        }
    },
    template: `
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">訂房間數:</label>
        </div>
        <input class="form-control" disabled v-model="rmNum">
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">房號:</label>
        </div>
        <input class="form-control" disabled v-model="props.rm">
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">入住天數:</label>
        </div>
        <input class="form-control" disabled v-model="days">
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">入住時間:</label>
        </div>
        <input class="form-control" type="date" v-model="st" disabled>
        <input class="form-control" type="date" v-model="ed" disabled>
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">總金額:</label>
        </div>
        <input class="form-control" disabled v-model="total">
    </section>
    <section class="input-group mb-2">
        <div class="input-group-prepend">
            <label class="input-group-text">需付訂金:</label>
        </div>
        <input class="form-control" disabled v-model="deposit">
    </section>
    <section class="mt-3 justify-content-between d-flex p-4">
        <button class="btn btn-outline-success" data-toggle="modal" data-target="#roomIns">確定</button>
        <button class="btn btn-outline-danger" @click="abolish">取消</button>
    </section>
    <roomIns :data="sendData" id="roomIns" />
    `,
    components: {
        roomIns
    }
}
