<!--
 * @Date           : 2020-09-09 23:56:34
 * @FilePath       : /backend-web/src/layouts/MainLayout.vue
 * @Description    : 
-->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-resize-observer @resize="on_window_resize" />
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> {{PROJECT_NAME}} </q-toolbar-title>
        <q-btn color="red" label="登出" @click="handle_click_logout()" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="120"
      class="bg-grey-1"
    >
      <q-list>
        <q-item
          v-for="(item, index) in menu_data"
          :class="item.name == $route.name ? 'bg-primary text-white' : ''"
          :key="`menu_data_${index}`"
          @click="go_to_page(item)"
          clickable
          v-ripple
        >
          <q-item-section> {{ item.title }} </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";
import { api_login } from "src/api/index.js";
import { LocalStorage, SessionStorage } from "quasar";
import menu_data from "src/config/menu.js";
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      menu_data,
      PROJECT_NAME:process.env.PROJECT_NAME
    };
  },
  methods: {
    ...mapActions([
      "set_window_size", //also supports payload `this.nameOfAction(amount)`
    ]),
    go_to_page(item) {
      this.$router.push({
        name: item.name,
      });
    },
    on_window_resize(size) {
      // console.log("----size  ---", size);
      // size.height= size.height<600?600:size.height
      // size.width =size.width<1200?1200:size.width
      this.set_window_size(size);
    },
    /**
     * 登出 系统
     */
    handle_click_logout() {
      api_login.get_logout();
      SessionStorage.remove("token");
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
