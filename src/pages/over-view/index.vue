<!--
 * @Date           : 2022-01-05 01:50:41
 * @FilePath       : /backend-web/src/pages/over-view/index.vue
 * @Description    : 
-->
<template>
  <div class="q-px-md">
    <!-- 头部功能栏 -->
    <div class="q-gutter-x-md q-mt-md row justify-end" >
             <q-markup-table  separator="cell" class="q-my-xs"   >
                <tbody>
                    <tr>
                        <td class="w150">appCode</td>
                        <td class="w150"> {{entity.appCode}}</td>
                    
                       
                        <td class="w150">登录状态</td>
                        <td class="w150"> {{entity.loginStatus}}</td>
                  
                    
                        <td class="w150">手机号</td>
                        <td class="w150"> {{entity.telephoneNumberWithCode}}</td>
                    </tr>
                </tbody>

             </q-markup-table>

      <q-btn color="primary" label="刷新数据" @click="handle_click_refresh" />
    </div>
    <div class="row"  >
      <div class="col q-pa-md" style="border-right: 0px solid #ccc">
        <!-- 操作日志 面板 -->
        <div  class="bg-grey-6 text-white   text-weight-bolder q-pa-sm"> 操作日志面板</div>
        <operatelog :is_component="true" :component_data="lastLogs"></operatelog>
      </div>
      <div class="col q-pa-md">
        
            <div class="bg-grey-6 text-white   text-weight-bolder q-pa-sm">任务 面板</div>
            <task :is_component="true" :component_data="inviteTaskEntities"></task>
         
      </div>
    </div>
  </div>
</template>

<script>
import { api_business } from "src/api/index.js";
import operatelog from "src/pages/operatelog/index.vue";
import task from "src/pages/task/index.vue";
export default {
  components: {
    operatelog,
    task,
  },
  data() {
    return {
      // 操作日志
      lastLogs: [],
      //邀请任务
      inviteTaskEntities: [],
      // entity
      entity: {},
    };
  },
  created() {
    this.init_table_data();
  },
  methods: {
    init_table_data() {
      let params = {};

      api_business
        .get_tgBusiness_overView()
        .then((res) => {
          console.log("res", res);
          let { code, data = {}, msg } = res.data;

          let { entity = {}, inviteTaskEntities = [], lastLogs = [] } = data;

          this.lastLogs = lastLogs;
          this.entity = entity;
          this.inviteTaskEntities = inviteTaskEntities;
          console.log(' this.entity', this.entity);
          console.log(' this.lastLogs', this.lastLogs);
          console.log(' this.inviteTaskEntities', this.inviteTaskEntities);
        })
        .catch((err) => {});
    },
    // 刷新数据
    handle_click_refresh() {
      this.init_table_data();
    },
  },
};
</script>

<style lang="scss" scoped></style>
