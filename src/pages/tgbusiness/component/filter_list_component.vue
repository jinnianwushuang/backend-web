<!--
 * @Date           : 2022-01-04 01:11:58
 * @FilePath       : /backend-web/src/pages/tgbusiness/component/filter_list_component.vue
 * @Description    : 
-->
<template>
    <div>
              <div>资源群组 </div>
               <q-input outlined v-model="name_filter" debounce="200" label="过滤" clearable  />
                <div v-for="(item,index) in table_data_filtered" :key="index">
                  <q-radio v-model="selected_id" @update:model-value ="handle_selected_id_change"  :val="item.id" :label="item.title" />
                </div>
  
        <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        label="Simple filter"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              没有结果
            </q-item-section>
          </q-item>
        </template>
      </q-select>

    </div>
</template>

<script>
export default {
    setup () {
        

        return {
            name_filter:"",
            selected_id:"",
        }
    },
    props: {
        table_data: {
            type: Array,
            default: []
        }
    },
    computed: {
           table_data_filtered(){
 
        return this.table_data.filter(x=>x.title.includes(this.table_data_filtered))
    },
    },
    created () {
 
    },
    methods: {
        handle_selected_id_change() {
                this.$emit("")
        }
    },


}
</script>

<style lang="scss" scoped>

</style>