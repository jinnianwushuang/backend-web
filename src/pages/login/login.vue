<!--
 * @Date           : 2021-01-15 01:43:26
 * @FilePath       : /backend-web/src/pages/login/login.vue
 * @Description    : 
-->
<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div>
        <q-btn
          color="white"
          class="absolute-top-right"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-card
          class="login-form"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
     
          <q-card-section>
  
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{PROJECT_NAME}}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="login_form.account" label="Username" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="login_form.password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  @click="handle_login"
                  type="button"
                  color="primary"
                />

                <a
                  style="font-size: 30px;"
                  class="float-right"
                  href="https://github.com/sponsors/mayank091193"
                  target="_blank"
                  title="Donate"
                  ><i class="fas fa-heart" style="color: #eb5daa"></i
                ></a>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

 

<script>
import {api_login} from  "src/api/index.js"

// import SHA1 from 'crypto-js/hmac-sha1';
import SHA1 from 'crypto-js/sha1';

 
import { LocalStorage, SessionStorage } from 'quasar'
 
export default {
  data() {
    return {
        PROJECT_NAME:process.env.PROJECT_NAME,
      login_form:{
              account: "目前写死的账号密码，直接点击登录",
      password: "123456"
      }

    };
  },
  created () {
      console.log('SHA1("Message")',SHA1("1"));
      console.log(' 8899' , SHA1("8899"));
      console.log(' 8899' , SHA1("8899")=="ed0b836395b0eece3ab9dd22be7567ddd2fdd885");
      ;
  },
  methods: {
       handle_login(){
        let params=    {
  "account": "103.218.3.17",
  "password": "ed0b836395b0eece3ab9dd22be7567ddd2fdd885"
}
      api_login.post_login(params).then(res=>{
        console.log('登录 -----',res);
        let  {code,data, msg}=res.data 
        
        console.log('token', data);
        if(data){
          SessionStorage.set('token',data)
          this. handle_login_success()
        }else{
          this.$q.notify({
            message:msg
          })
        }

      })
    },
    handle_login_success(msg) {
      this.$router.push({
        name: "operatelog"
      });
      this.$q.notify({
        message:msg
      });
    }
  },
  mounted() {

 
 
 },
 
};
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
}
.login-form {
  position: absolute;
}
</style>
