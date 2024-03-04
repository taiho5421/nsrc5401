import msgIns from "../../components/msgIns.js";
import msgUpd from "../../components/msgUpd.js";
import msgDel from "../../components/msgDel.js";

export default {
    setup() {
        let ms = Vue.inject('ms')
        let ord = Vue.ref([])
        let src = Vue.ref([])
        let setSrc = (data) => {
            src.value = JSON.parse(JSON.stringify(data))
        src.value.img = null
        }
        return {
            data: ms,
            ord: ord,
            src: src,

            setSrc: (data) => setSrc(data)
        }
    },
    template: `
    <article class="card-header">
        <h2 class="card-title d-flex">
            <div>訪客留言</div>
            <button class="btn btn-outline-info ml-auto" data-toggle="modal" data-target="#msgIns">新增</button>
        </h2>
    </article>
    <article class="card-body">
        <section class="card d-flex flex-row mb-3" :class="dt.top === '1' ? 'shadow-lg' : null" style="height: 150px" v-for="dt in data">
            <div class="border-right" style="width: 200px">
                <h3 class="text-center">{{dt.name}}</h3>
                <div>
                    <span class="badge badge-success badge-pill mr-2">創建</span>
                    <small>{{dt.create_at}}</small>
                </div>
                <div v-if="dt.create_at === dt.delete_at">
                    <span class="badge badge-warning badge-pill mr-2">編輯</span>
                    <small>{{dt.update_at}}</small>
                </div>
                <div v-if="dt.create_at !== dt.delete_at">
                    <span class="badge badge-danger badge-pill mr-2">刪除</span>
                    <small>{{dt.delete_at}}</small>
                </div>
                <div>
                    <span class="badge badge-info badge-pill mr-2">信箱</span>
                    <small v-if="dt.email_show === '1' && dt.delete_at === dt.create_at">{{dt.email}}</small>
                </div>
                <div>
                    <span class="badge badge-info badge-pill mr-2">電話</span>
                    <small v-if="dt.phone_show === '1' && dt.delete_at === dt.create_at">{{dt.phone}}</small>
                </div>
            </div>
            <div class="flex-fill">
            <div class="h-50">
                <p v-if="dt.delete_at === dt.create_at">{{dt.msg}}</p>
                <p v-else>已刪除</p>
            </div>
            <div class="h-50 border-top" v-if="dt.replies !== null && dt.delete_at === dt.create_at">
                <span class="badge-secondary badge-pill">管理者回覆:</span>
                <p class="ml-4">{{dt.replies}}</p>
            </div>
            </div>
            <div class="" style="width: 150px" v-if="dt.img !== 'NULL' && dt.delete_at === dt.create_at">
                <img class="w-100 h-100 img-thumbnail" :src="'../../img/' + dt.img" style="object-fit: cover" alt=".">
            </div>
            <div class="border-left" style="width: 200px">
                <input class="form-control" :placeholder="dt.ord" v-model="ord[dt.id]" v-if="dt.delete_at === dt.create_at">
                <div class="d-flex flex-row justify-content-between" v-if="ord[dt.id] === dt.ord">
                    <button class="btn btn-outline-warning" data-toggle="modal" data-target="#msgUpd" @click="setSrc(dt)">編輯</button>
                    <button class="btn btn-outline-danger" data-toggle="modal" data-target="#msgDel" @click="setSrc(dt)">刪除</button>
                </div>
            </div>
        </section>
    </article>
    <msgIns id="msgIns" />
    <msgUpd id="msgUpd" :form="src" />
    <msgDel id="msgDel" :form="src" />
    `,
    methods: {

    },
    computed: {

    },
    components: {
        msgIns,
        msgUpd,
        msgDel,
    }
}
