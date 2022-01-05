<!--
 * @Date           : 2020-09-13 00:45:57
 * @FilePath       : /backend-web/src/pages/exceptionlog/index.vue
 * @Description    : 
-->
<template>
  <div class="q-px-md">
    <!-- 头部功能栏 -->
    <div class="q-gutter-x-md q-mt-md  row justify-end">
      <q-btn color="primary" label="刷新数据" @click="handle_click_refresh" />
    </div>
    <!-- 表格区域 -->
    <div class="q-py-md">
      <q-table
        class="my-sticky-header-table"
        :rows="table_data"
        :columns="columns"
        hide-pagination
        :pagination="pagination"
        hide-bottom
        row-key="name"
        :style="table_style"
      >
        <template v-slot:body-cell-handle="props">
          <q-td :props="props">
            <div class="q-gutter-x-md">
              <q-btn
                color="primary"
                label="查看数据"
                @click="handle_click_show_json(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <!-- 翻页器 -->
    <my-pagination
      :total="total"
      @pagination_change="handle_pagination_change"
    ></my-pagination>
 
    <!-- json 查看 -->
    <q-dialog
      v-model="show_json_dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 60vw; height: 60vh">
        <q-card-section class="row items-center">
          <div>json 查看</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <json-viewer
            :value="jsonData"
            :expand-depth="5"
            preview-mode
            copyable
            expanded
            sort
          ></json-viewer>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { columns } from "src/pages/operatelog/config/index.js";
import { api_operatelog } from "src/api/index.js";
import myPagination from "src/components/pagination/pagination1.vue";
import JsonViewer from "vue-json-viewer";
import { date } from "quasar";
export default {
  components: {
    myPagination,
    JsonViewer,
  },
  data() {
    return {
      columns,
      table_data: [],
    
      show_json_dialog: false,
   
      jsonData: {},
      total: 0,
      table_style: {},
      pagination: {
        currentPage: 1,
        pageSize: 20,
        page: 1,
        rowsPerPage: 20,
      },

    };
  },
  computed: {
    ...mapGetters({
      window_size: "get_window_size",
    }),
  },
  created() {
    this.table_style = {
      height: window.innerHeight - 210 + "px",
    };

    this.init_table_data();
   
  },
  watch: {
    window_size(newValue, oldValue) {
      console.log("window_size", this.window_size);
      // this.table_style={
      // height:this.window_size.height-150   +"px",
      // maxHeight:this.window_size.height-150   +"px",
      // }
    },
  },
  methods: {
    init_table_data() {
      let endTime = new Date().getTime();
      let startTime = Date.parse(date.subtractFromDate(endTime, { hours: 24 }));

      let params = {
        page: {
          current: 1, //分页参数
          size: 1000, //每页数据个数
        },
        endTime, // 日志截止时间戳
        startTime, // 日志开始时间戳
      };
      console.log("api_operatelog", api_operatelog);
      api_operatelog.post_log_queryExceptionLog(params).then((res) => {
        console.log("----调用接口返回数据");

        let data = this.$lodash.get(res, "data.data");
        console.log(data);
        this.table_data = data.records;
        console.log(" this.table_data---", this.table_data);

        this.total = data.total;
        this.$forceUpdate();
        // current: 1
        // pages: 1
        //  searchCount: true
        // size: 100
        // total: 23

        this.pagination = {
          currentPage: data.currentPage,
          pageSize: data.pageSize,
          rowsPerPage: data.pageSize,
        };
      });
    },
    //翻页器数据改变
    handle_pagination_change(obj) {
      console.log("1");
      console.log("obj", obj);
      this.pagination = {
        currentPage: obj.currentPage,
        pageSize: obj.pageSize,
        page: obj.currentPage,
        rowsPerPage: obj.pageSize,
      };
      this.init_table_data();
    },
    // 查看json
    handle_click_show_json(item) {
      console.log("查看json", item);
      this.jsonData = item;
      this.show_json_dialog = true;
    },
    // 刷新
    handle_click_refresh() {
      console.log("刷新数据");
      this.init_table_data();
    },
  },
};
</script>

<style lang="scss" scoped></style>
