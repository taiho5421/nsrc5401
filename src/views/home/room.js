import {getDt} from "../../service";
import chRm from "../../components/chRm.js";
import roomForm from "../../components/roomForm.js";
import roomCheck from "../../components/roomCheck.js";

export default {
    setup() {
        let year = Vue.ref(new Date().getFullYear())
        let month = Vue.ref(new Date().getMonth())
        let day = Vue.ref([])
        let st = Vue.ref(null)
        let ed = Vue.ref(null)
        let child = Vue.ref('form')
        let rm = Vue.ref([])
        getDt({year: year.value, month: month.value + 1}).then(res => { day.value = res})
        let rmNum = Vue.computed(() => {
            if (st.value === null)
                rm.value = []
            if (ed.value !== null) {
                rm.value = []
            } else
            return rm.value.length
        })
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
        let choose = (data) => {
            if (data.date !== '0000-00-00') {
                let date = new Date(data.date);
                if (st.value === null && ed.value === null) {
                    st.value = date;
                } else if (st.value !== null && ed.value === null) {
                    if (+st.value === +date) {
                        st.value = null;
                    } else if (+st.value < +date) {
                        ed.value = date;
                    }
                } else if (st.value === null && ed.value !== null) {
                    console.log('err');
                } else if (st.value !== null && ed.value !== null) {
                    if (+ed.value === +date) {
                        ed.value = null;
                    } else if (+st.value < +date) {
                        ed.value = date;
                    }
                }
            }
        }
        let isSelect = (data) => {
            if (data.date !== '0000-00-00') {
                let date = new Date(data.date)
                if (st.value && ed.value)
                    return date >= st.value && date <= ed.value
                else if (st.value) {
                    return date.getTime() === st.value.getTime();
                }

            }
            return false
        }

        let autoRm = () => {
            let stIndex = day.value.findIndex(item => item.date === st.value.toISOString().slice(0, 10))
            let edIndex = day.value.findIndex(item => item.date === ed.value.toISOString().slice(0, 10))
            let arrRm = [1,1,1,1,1,1,1,1];
            for (let j = 0; j < 8; j++) {
                for (let i = stIndex; i <= edIndex; i++) {
                    if (day.value[i].room[j] === '1')
                        arrRm[j] = 0
                }
            }
            if (rmNum > arrRm.filter(el => el === 1).length || rmNum === undefined)
                window.alert('無空房或者無輸入訂房間數')
            else {
                let indices = arrRm.reduce((acc, val, index) => {
                    if (val === 1)
                        acc.push(index + 1)
                    return acc
                }, [])
                rm.value = indices.slice(0, rmNum)

            }
        }
        const handleSetRmNum = (newRmNum) => {
            rmNum = newRmNum
        }
        let resetDate = () => {
            st.value = null
            ed.value = null
        }
        let checkRmNum = () => {
            if (rm.value.length === 0)
                window.alert('請選擇房間')
            else {
                child.value = 'check'
            }
        }
        let abo = () => {
            child.value = 'form'
        }
        return {
            year: year,
            month: month,
            day: day,
            child: child,
            st: st,
            ed: ed,
            rm: rm,
            rmNum: rmNum,
            autoRm,
            prevMonth: prevMonth,
            nextMonth: nextMonth,
            choose: choose,
            isSelect: isSelect,
            handleSetRmNum,
            resetDate,
            checkRmNum,
            abo,
        }
    },
    template: `
    <article class="card-header">
        <h2 class="card-title">線上訂房</h2>
    </article>
    <article class="card-body d-flex">
        <div class="col-8 card">
            <section class="d-flex flex-row justify-content-between card-header rounded-top">
                <button class="btn btn-outline-info" @click="prevMonth">&lAarr;</button>
                <h3>{{ year }} 年 {{ month+1 }} 月</h3>
                <button class="btn btn-outline-info" @click="nextMonth">&rAarr;</button>
            </section>
            <table class="table table-bordered text-center">
                <thead>
                <tr>
                    <th v-for="i in '日一二三四五六'">{{ i }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in (day.length / 7)">
                    <td v-for="j in 7" @click="choose(day[(i - 1) * 7 + j - 1])" :style="{ 'background-color': isSelect(day[(i - 1) * 7 + j - 1]) ? 'yellow' : 'transparent' }">
                        <div v-if="day[(i - 1) * 7 + j - 1].date !== '0000-00-00'">
                            <h4>{{ day[(i - 1) * 7 + j - 1].date.slice(-2) }}</h4>
                            <small>剩餘 {{ day[(i - 1) * 7 + j - 1].count }} 間</small>
                            <small>$5000</small>
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
            <roomForm @update:rmNum="autoRm" @set:rmNum="handleSetRmNum" v-if="child === 'form'" :st="st == null ? null : st.toISOString().slice(0, 10)" :ed="ed == null ? null : ed.toISOString().slice(0, 10)" :rmNum="rmNum" :rm="rm" />
            <section class="mt-3 justify-content-between d-flex p-4" v-if="child === 'form'">
                <button class="btn btn-outline-success" @click="checkRmNum">確定</button>
                <button class="btn btn-outline-danger" @click="resetDate">取消</button>
            </section>
            <roomCheck :st="st" :ed="ed" :rm="rm" v-if="child === 'check'" @update:rm="abo" />
        </div>
    </article>
    <chRm id="chRm" :st="st == null ? null : st.toISOString().slice(0, 10)" :day="day" :rm="rm" :rmNum="rmNum" @update:rm="rm = $event" />
    `,
    methods: {

    },
    computed: {

    },
    components: {
        chRm,
        roomForm,
        roomCheck,
    }
}
