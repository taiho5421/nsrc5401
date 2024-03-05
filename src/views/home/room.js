import {getDt} from "../../service";
import chRm from "../../components/chRm.js";

export default {
    setup() {
        let year = Vue.ref(new Date().getFullYear())
        let month = Vue.ref(new Date().getMonth())
        let day = Vue.ref([])

        getDt({year: year.value, month: month.value + 1}).then(res => { day.value = res})

        let nextMonth = () => {
            month.value += 1
            if (month.value > 11) {
                month.value = 0
                year.value += 1
            }
            getDt({year: year.value, month: month.value + 1}).then(res => { day.value = res})
        }
        let prevMonth = () => {
            month.value -= 1
            if (month.value < 0) {
                month.value = 11
                year.value -= 1
            }
            getDt({year: year.value, month: month.value + 1}).then(res => { day.value = res})

        }
        return {
            year: year,
            month: month,
            day: day,
            prevMonth: prevMonth,
            nextMonth: nextMonth,
        }
    },
    template: `
    <article class="card-header">
        <h2 class="card-title">線上訂房</h2>
    </article>
    <article class="card-body d-flex">
        <div class="col-8 card">
            <section class="d-flex flex-row justify-content-between card-header rounded-top">
                <button class="btn btn-outline-info" @click="prevMonth">上個月</button>
                <h3>{{ year }} 年 {{ month+1 }} 月</h3>
                <button class="btn btn-outline-info" @click="nextMonth">下個月</button>
            </section>
            <table class="table table-bordered text-center">
                <thead>
                <tr>
                    <th v-for="i in '日一二三四五六'">{{i}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in (day.length / 7)">
                    <td v-for="j in 7">
                        <div v-if="day[(i - 1) * 7 + j - 1].date !== '0000-00-00'">
                            <h4>{{ day[(i - 1) * 7 + j - 1].date.slice(-2) }}</h4>
                            <small>剩餘 {{ day[(i - 1) * 7 + j - 1].count }} 間</small>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col card">
            <section class="text-center my-3">
                <h3>訂房表單</h3>
            </section>
            <section class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text">訂房間數:</label>
                </div>
                <input class="form-control" type="number">
            </section>
            <section class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text">入住天數:</label>
                </div>
                <input class="form-control" type="number">
            </section>
            <section class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text">入住時間:</label>
                </div>
                <input class="form-control" type="date">
                <input class="form-control" type="date">
            </section>
            <section class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text">房號:</label>
                </div>
                <input class="form-control" type="text">
                <div class="input-group-append">
                    <button class="btn btn-primary">自動</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#chRm">選擇</button>
                </div>
            </section>
            <section class="mt-3 justify-content-between d-flex p-4">
                <button class="btn btn-outline-success">確定</button>
                <button class="btn btn-outline-danger">取消</button>
            </section>
        </div>
    </article>
    <chRm id="chRm" />
    `,
    methods: {

    },
    computed: {

    },
    components: {
        chRm
    }
}
