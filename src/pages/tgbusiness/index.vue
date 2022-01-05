<!--
 * @Date           : 2020-09-13 00:45:57
 * @FilePath       : /backend-web/src/pages/tgbusiness/index.vue
 * @Description    : 
-->
<template>
  <div class="q-px-md">
    <!-- 头部功能栏 -->
    <div class="q-gutter-x-md q-mt-md row justify-end">
         <q-input outlined dense label="过滤标题" debounce="500" v-model.trim="name_filter"></q-input>
     
          <q-btn color="primary" label="新增数据" @click="handle_click_add" />
      <q-btn color="primary" label="刷新数据" @click="handle_click_refresh" />
  
    </div>
    <!-- 表格区域 -->
    <div class="q-py-md">
      <q-table
        class="my-sticky-header-table"
        :rows="table_data_filtered"
        :columns="columns"
        hide-pagination
        :pagination="pagination"
        hide-bottom
        row-key="name"
        :style="table_style"
     
      >
        <!-- 描述 -->
        <template v-slot:body-cell-description="props">
          <q-td :props="props">
            <div>
         <p class="p-break-spaces">{{ props.row.description }}</p>
            </div>
          </q-td>
        </template>
        <!-- 邀请到其他群 -->

       <template v-slot:body-cell-invite_from_group="props">
          <q-td :props="props">
            <div >
               <filter-list
               v-if="!props.row.invite_to_group"
                :label="`邀请到其他群`" 
                :table_data="table_data"
                 :cid="props.row._id"
                v-model="props.row.invite_from_group"
               
                 
               
               ></filter-list>  
            </div>
          </q-td>
        </template>
      <!-- 从其他群邀请 -->
       <template v-slot:body-cell-invite_to_group="props">
          <q-td :props="props">
            <div>
                <filter-list
                  v-if="!props.row.invite_from_group"
                :label="`从其他群邀请`" 
                :table_data="table_data"
                   :cid="props.row._id" 
                v-model="props.row.invite_to_group"
                
               
               ></filter-list>  
            </div>
          </q-td>
        </template>

      <!-- 操作 -->
        <template v-slot:body-cell-handle="props">


    

          <q-td :props="props">
            <div class="q-gutter-x-md">
             <q-btn
                color="primary"
                label="迁移"
                @click="handle_tgBusiness_migrate(props.row)"

              />   
             <q-btn
                color="primary"
                label="更新人数"
                @click="handle_tgBusiness_queryGroupMember(props.row)"
              />      
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
    <!-- <my-pagination
      :total="total"
      @pagination_change="handle_pagination_change"
    ></my-pagination> -->
    <!-- 弹出窗口 -->
    <q-dialog
      v-model="show_edit_dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 550px" class="q-px-md">
        <q-card-section>
          <div class="text-h6">{{ edit_dialog_title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-y-sm">
          <div class="row">
            <div class="form-label">手机区号</div>
            <q-input outlined dense v-model.number="editing_obj.regionCode">
            </q-input>
            
          </div>

              <div class="row">
     
           
            <div class="form-label">手机号码</div>
            <q-input outlined dense v-model.number="editing_obj.phoneNumber">
            </q-input>
          </div>     
          <div class="row">
            <div class="form-label">登录验证码</div>
            <q-input outlined dense v-model.number="editing_obj.verifyCode">
            </q-input>
            <div class="q-ml-md"><q-btn color="primary" label="获取验证码"></q-btn></div>
          </div>
          <div class="row">
            <div class="form-label">群组名称</div>
            <q-input outlined dense v-model="editing_obj.title"> </q-input>
          </div>
          <div class="row">
            <div class="form-label">群组描述</div>
            <q-input outlined dense v-model="editing_obj.description">
            </q-input>
          </div>
          <div class="row">
            <div class="form-label">forImport</div>
            <q-radio v-model="editing_obj.forImport" val="true" label="true" />
            <q-radio
              v-model="editing_obj.forImport"
              val="false"
              label="false"
            />
          </div>
          <div class="row">
            <div class="form-label">isChannel</div>
            <q-radio v-model="editing_obj.isChannel" val="true" label="true" />
            <q-radio
              v-model="editing_obj.isChannel"
              val="false"
              label="false"
            />
          </div>
        </q-card-section>


        <q-card-actions align="right">

              <q-btn
            class="q-mx-md"
            label="登出当前TG账号"
            color="primary"
            @click="handle_tgBusiness_logout"
          />      
          <q-btn
            class="q-mx-md"
            label="确认"
            color="primary"
            @click="handle_click_submit"
          />
          <q-btn label="取消" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { columns } from "src/pages/tgbusiness/config/index.js";
import { api_business } from "src/api/index.js";
import myPagination from "src/components/pagination/pagination1.vue";
import  filterList from "src/pages/tgbusiness/component/filter_list.vue"
import JsonViewer from "vue-json-viewer";
import { date } from "quasar";
export default {
  components: {
    myPagination,
    JsonViewer,
    filterList
  },
  data() {
    return {
      columns,
      table_data: [], //原始全量数据
      name_filter:"",
      show_edit_dialog: false,  // 编辑 新增数据弹窗
      show_json_dialog: false,  // 查看json 数据弹窗
   
      edit_dialog_title: "新增数据",
      jsonData: {},
      total: 0,
      table_style: {},

      pagination: {
        currentPage: 1,
        pageSize: 20,
        page: 1,
        rowsPerPage: 20,
      },
      editing_obj_template: {
       
      },
      editing_obj: {
          regionCode:"", //手机区号
          phoneNumber:"", //手机号码
          verifyCode:"",//登录验证码
          title:"",//群组名称
          description:"",//群组描述
          forImport:false,//forImport
          isChannel:false,//isChannel 暂时直接给 false (是否是订阅频道,true:频道;false:群组)
      },
    };
  },
  computed: {
    ...mapGetters({
      window_size: "get_window_size",
    }),
    // 列表过滤数据
        table_data_filtered(){
 
        return this.table_data.filter(x=>x.title.includes(this.name_filter.toLowerCase()))
    },

  },
  created() {
    this.table_style = {
      height: window.innerHeight - 210 + "px",
    };
    this.init_table_data();
    this.init_editing_obj_template();
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
          current: 1, // 当前页编号
          size: 100, // 每页的 个数
        }, //分页参数
        title: "", // 群组标题(模糊搜索)。 可以为空
      };
      console.log("api_business", api_business);
      api_business.post_tgBusiness_queryGroup(params).then((res) => {
        console.log("----post_tgBusiness_queryGroup 调用接口返回数据");
        let data = this.$lodash.get(res, "data.data");
        console.log(data);
        this.table_data = data.records;
        console.log(" this.table_data---", this.table_data);
        this.total = data.total;
        this.$forceUpdate();
        this.pagination = {
          currentPage: data.current,
          pageSize: data.size,
          rowsPerPage: data.size,
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
        //初始化 editing_obj_template
    init_editing_obj_template() {
      console.log("初始化 editing_obj_template");
      this.editing_obj_template = this.$lodash.cloneDeep(this.editing_obj);
    },
    //初始化 editing_obj
    init_editing_obj() {
      console.log("初始化 editing_obj");
      this.editing_obj = this.$lodash.cloneDeep(this.editing_obj_template);
    },
    // 新增
    handle_click_add() {
      console.log("新增");
      this.edit_dialog_title = "新增数据";
      this.init_editing_obj();
      this.show_edit_dialog = true;
    },
    // 编辑
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
   
    // 新增或者修改后提交服务器
    handle_click_submit() {
      console.log("新增或者修改后提交服务器");
      this.show_edit_dialog = false;
      if (this.editing_obj.id) {
        // 编辑
       
      } else {
        //新增
        this.handle_click_submit_add();
      }
    },
    // 提交新增
    handle_click_submit_add() {
      let params =  this.editing_obj;
     let obj= 	{
		  "description": "string",  	// 群组描述
		  "forImport": false,			// 随便填写
		  "isChannel": false,			// 暂时直接给 false (是否是订阅频道,true:频道;false:群组)
		  "title": "string"  			// 群组标题
		}	
      api_business.post_tgBusiness_createNewGroup(params).then((res) => {
        if (!obj) {
          this.init_table_data();
        }
      });
    },
  
    // tg账号 登录
    handle_tgBusiness_login() {
      let params = {
        phoneNumber: "13655669988", //手机号码
        regionCode: "86", // 编号
      };
      api_business.post_tgBusiness_login(params).then((res) => {});
    },
    // tg 获取验证码
    handle_tgBusiness_verifyCode() {
      let params = {
        verifyCode: "string", //TG账号的验证码
      };
      api_business.post_tgBusiness_verifyCode(params).then((res) => {});
    },
    //   TG账号登出
    handle_tgBusiness_logout() {
      let params = {
        // "verifyCode": "string" //TG账号的验证码
      };
      api_business.get_tgBusiness_logout(params).then((res) => {});
    },
    //   更新群组的TG用户信息
    handle_tgBusiness_queryGroupMember(item) {
      let params = {
        "id":  item. _id,// 群组id
      };
      api_business.post_tgBusiness_queryGroupMember(params).then((res) => {
          console.log('res',res);
      });
    },

    //  将群A的用户邀请到群B
    handle_tgBusiness_migrate(item) {
      if(!item.invite_from_group && !item.invite_to_group){

        return false 
      }
   
      let params={}
      if( item.invite_from_group){
       params  = {
       	  "dstGroupId":   item._id,  // 群B的 id
		  "srcGroupId": item.invite_from_group // 群A的 id
      };
      }else{
           params  = {
       	  "dstGroupId":   item.invite_to_group ,  // 群B的 id
		  "srcGroupId":  item._id   // 群A的 id
      };
      }

      api_business.post_tgBusiness_migrate(params).then((res) => {
          console.log('res',res);
   
          this.init_table_data()
          
      });
    },
 




  },
};
</script>
<style lang="scss" scoped></style>
