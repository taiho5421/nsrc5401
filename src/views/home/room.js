import {getDt} from "../../service";

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
    <article class="card-body">
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
                    <div v-if="day[(i - 1) * 7 + j - 1] > 0">
                        <h4>{{ day[(i - 1) * 7 + j - 1] }}</h4>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </article>
    `,
    methods: {

    },
    computed: {

    },
    components: {

    }
}
