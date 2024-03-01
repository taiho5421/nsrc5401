import msgIns from "../../components/msgIns.js";
import msgUpd from "../../components/msgUpd.js";
import msgDel from "../../components/msgDel.js";

export default {
    setup() {
        let ms = Vue.inject('ms')

        return {
            data: ms
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
                    <small v-if="dt.email_show">{{dt.email}}</small>
                </div>
                <div>
                    <span class="badge badge-info badge-pill mr-2">電話</span>
                    <small v-if="dt.phone_show">{{dt.phone}}</small>
                </div>
            </div>
            <div class="flex-fill">
            <div class="h-50">
                <p>{{dt.msg}}</p>
            </div>
            <div class="h-50 border-top" v-if="dt.replies !== 'NULL'">
                <span class="badge-secondary badge-pill">管理者回覆:</span>
                <p class="ml-4">{{dt.replies}}</p>
            </div>
            </div>
            <div class="" style="width: 150px" v-if="dt.img !== 'NULL'">
                <img class="w-100 h-100 img-thumbnail" :src="'../../img/' + dt.img" style="object-fit: cover">
            </div>
            <div class="border-left" style="width: 200px">
                <input class="form-control" :placeholder="dt.ord">
                <div class="d-flex flex-row justify-content-between">
                    <button class="btn btn-outline-warning" data-toggle="modal" data-target="#msgUpd">編輯</button>
                    <button class="btn btn-outline-danger" data-toggle="modal" data-target="#msgDel">刪除</button>
                </div>
            </div>
        </section>
    </article>
    <msgIns id="msgIns" />
    <msgUpd id="msgUpd" />
    <msgDel id="msgDel" />
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
