<!--
 * @Date           : 2020-09-18 22:43:21
 * @FilePath       : /node-quasar-fullstack/src/components/pagination/pagination1.vue
 * @Description    : 
-->
<template>
  <div class="row q-py-md full-width justify-center text-center items-center  " >
      <q-space/>
    <q-pagination
      v-model="currentPage"
      :max="max_page"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      :max-pages="7"
     
    >
    </q-pagination>

    <q-select
      class="q-mx-lg"
      style="width:330px"
      dense
      outlined
      v-model="pageSize"
      :options="pageSize_options"
    >
      <template v-slot:before>
        <div>
          每页条数
        </div>
      </template>
        <template v-slot:after>
        <div>
          总条目数 {{total}} 
        </div>
      </template>
    </q-select>

 <q-space/>
    <!-- <q-input outlined v-model="total">
      <template v-slot:before>
        <div>
          总条目数
        </div>
      </template>
    </q-input> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      max_page: 1,
      pageSize: 20,
      pageSize_options: [5, 10, 20, 50, 100]
    };
  },
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  created () {
     this. compute_max_page() ;
  },
  watch: {
    total(newValue, oldValue) {
         console.log(' total       改变');
      this.compute_max_page();
    },
    pageSize(newValue, oldValue) {
        console.log(' pageSize       改变');
      this.compute_max_page();
      this.emit_new_pagination()
    },
    currentPage(newValue, oldValue) {
         console.log(' currentPage       改变');
      this.compute_max_page();
      this.emit_new_pagination()
    }
  },
  methods: {
    // 计算总页数
    compute_max_page() {
          console.log(' 计算总页数',this.total , this.pageSize);
      this.max_page = Math.ceil(this.total / this.pageSize);
    },
    //提交新值
    emit_new_pagination() {
      this.$emit("pagination_change", {
        currentPage: this.currentPage,
        // max_page:this.max_page,
        pageSize: this.pageSize
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
