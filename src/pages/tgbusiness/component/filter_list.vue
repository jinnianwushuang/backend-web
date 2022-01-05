<!--
 * @Date           : 2022-01-04 01:11:58
 * @FilePath       : /backend-web/src/pages/tgbusiness/component/filter_list.vue
 * @Description    : 
-->
<template>
  <div>
    <q-select
      filled
      clearable
      v-model="selected_id"
      use-input
      input-debounce="0"
      :label="label"
      :options="table_data_filtered"
   
      style="width: 250px"
      emit-value
      map-options
      option-value="_id"
      option-label="title"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> 没有结果 </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name_filter: "",
      selected_id: "",
    };
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    table_data: {
      type: Array,
      default: [],
    },
    label: "",
     cid: Number,
  },
  computed: {
    table_data_filtered() {
      return this.table_data.filter((x) =>
        x.title.includes(this.name_filter.toLowerCase())&&(x._id!=this.cid)
      );
    },
  },
  created() {},
  watch: {
    selected_id(newValue, oldValue) {
      console.log('selected_id----------', this.selected_id);
      this.$emit("update:modelValue", this.selected_id);
    },
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped></style>
