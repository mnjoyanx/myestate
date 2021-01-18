<template>
    <div>
        <div id="edit_page">
            <div class="edit_page_title">
                <h2>{{ $t('personal_page_text') }}</h2>
            </div>
            <div>
<!--                {{ user }}-->
            </div>
            <hr>

            <div class="add_photo">
              <span>{{imgDataUrl == require('@/assets/images/man.svg') ? $t('photo') : ''}}</span>

                <div class="userImg" v-if="showLng">
                  <my-upload field="img"
                     :langExt="$t('photoUpload')"
                     @crop-success="cropSuccess"
                     @crop-upload-success="cropUploadSuccess"
                     @crop-upload-fail="cropUploadFail"
                     v-model="show"
                     :width="300"
                     :height="300"
                     url="/upload"
                     :params="params"
                     :headers="headers"
                     img-format="png"></my-upload>
                  <img :src="imgDataUrl" />
                </div>

                <button class="edit_btn" @click="toggleShow">{{$t('edit')}}</button>
            </div>
            <hr>
            
            <div class="full_name">
                <p class="titleName">{{$t('full_name')}}</p>
                <input type="text" class="user_input" :class="{'user_active': !userName}" :placeholder="$t('for_example') + ' Jhon Doe'" v-model="user.full_name" :disabled="userName">
              <button class="edit_btn" :class="{'avtive_btn': !userName }" @click="userName= !userName">{{userName ? $t('edit') : $t('save')}}</button>
            </div>
            <hr>

            <div class="account_type">
                <p class="titleName">{{$t('account_type')}}</p>
                <span>{{$t('ac_type')}}</span>
            </div>
            <hr>

            <div class="mail">
                <p>{{$t('email_text')}}</p>
                <div class="mail_edit">
                    <input type="email" class="user_input" :class="{'user_active': !userEmail}" name="" placeholder="example@gmail.com" v-model="user.email" :disabled="userEmail">
                    <button class="edit_btn" :class="{'avtive_btn': !userEmail }" @click="userEmail = !userEmail">{{userEmail ? $t('edit') : $t('save')}}</button>
                </div>
                <hr>

            </div>
            <div class="pass">
                <p class="titleName">{{$t('password_text')}}</p>
                <input type="password" v-model="user.password" class="user_input" :class="{'user_active': !password}" :placeholder="$t('password_text')" :disabled="password">
                <button class="edit_btn" :class="{'avtive_btn': !password }" @click="password= !password">{{ password ? $t('change') : $t('save')}}</button>
            </div>
            <hr>

            <div class="mail_phone">
                <p>{{$t('tel_number')}}</p>

                <div class="tel_num">
                  <div class="tel_input_container">
                    <VuePhoneNumberInput :countryCode="user.countryCode" :default-country-code="'AM'" v-model="user.phone" placeholder="Number"  />
                  </div>

<!--                    <select class="addPostForm addPostSection1">-->
<!--                        <option value="+374">+374</option>-->
<!--                    </select>-->

<!--                    <input type="tel" name="" placeholder="XX-XX-XX-XX" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}">-->
<!--                  <input type="tel" class="agreement-inp-2 phone-number"  placeholder="Client Phone" id="client-phone">-->


                    <div class="check_phone">
                
                          <label class="soc_label">
                              <div class="soc-icon viber"></div>
                              <input type="checkbox" v-model="user.viber">
                              <span class="check"></span>
                          </label>
                          <label class="soc_label">
                              <div class="soc-icon whatsapp"></div>
                              <input type="checkbox" v-model="user.whatsapp">
                              <span class="check"></span>
                          </label>
                          <label class="soc_label">
                              <div class="soc-icon telegram"></div>
                              <input type="checkbox" v-model="user.telegram">
                              <span class="check"></span>
                          </label>
                      <button class="edit_btn">{{$t('edit')}}</button>
                    </div>
                </div>
<!--                -->
<!--                <div class="add_umber">-->
<!--                    <button>Ավելացնել հեռախոսահամար</button>-->
<!--                </div>-->
            </div>
            <hr>

            <div class="delete_user">
              <div class="remove_icon"></div>
                <button class="remove_account">{{$t('remove_account')}}</button>
            </div>
            <hr> 

<!--            <div class="save">-->
<!--                <button>Պահպանել</button>-->
<!--            </div>-->

        </div>
    </div>
</template>

<script>

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import myUpload from 'vue-image-crop-upload/upload-2.vue';
import {mapState} from "vuex";

export default {
  name: "edit",
  components: {
    VuePhoneNumberInput,
    'my-upload': myUpload
  },
  data() {
    return {
      userName: true,
      userEmail: true,
      password: true,
      user: {
        full_name: "John Doe",
        email: 'example@gmail.com',
        password: '123456',
        phone: "22333444",
        countryCode: 'AM',
        viber: false,
        whatsapp: false,
        telegram: false
      },
      show: false,
      showLng: true,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: require('@/assets/images/man.svg'),


    }
  },
  computed: {
    ...mapState(["lang"]),

  },
  watch: {
    'lang.locale': {
      immediate: true,
      handler() {
        this.showLng = false;
        setTimeout(() => {
          this.showLng = true
        }, 100)
      }
    }
  },


  methods: {
    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess(imgDataUrl){
      this.imgDataUrl = imgDataUrl;
    },

    // cropUploadSuccess(jsonData){
    //   // console.log(jsonData);
    // },
    //
    // cropUploadFail(status, field){
    //   // console.log(status);
    //   // console.log('field: ' + field);
    // }
  }
  // props: {
  //     user: Object
  // }
}



</script>

<style scoped>
    #edit_page {
        margin: 20px
    }

    .edit_page_title h2{
        font-weight: bold;
        font-size: 24px;
    }

    button{
        border: none;
    }
    .add_photo{
        display: flex;
        position: relative;
    }
    .add_photo span {
      position: absolute;
      top: 24px;
      left: 15px;
    }
    .edit_btn {
      background-color: transparent;
      color: #004af1;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      outline: none;

    }
    .userImg{
      margin-right: 2rem;
      border: 1px solid #d4d4d4;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-position: center;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      /* background-image: url("../../assets/images/user.png"); */
    }
    .userImg img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      /* background-image: url("../../assets/images/user.png") */
    }
    .check_phone{
        display: flex;
        align-self: flex-start;
    }
     label{
         margin-right:2rem ;
    }
     .user_input {
       border: none;
       outline: none;
       padding: 4px 8px;
     }
     .user_active {
       border: 1px solid #a7a7a7;
       border-radius: 5px;
     }
     .titleName {
       font-weight: 600;
       font-stretch: normal;
       font-style: normal;
       line-height: 1.38;
       letter-spacing: normal;
       color: #100f0f;
     }
    .tel_input_container {
      width: 310px !important;
    }
    .soc-icon {
      width: 25px;
      height: 25px;
      object-fit: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 15px 1px 15px;
      cursor: pointer;

    }
    .viber {
      background-image: url("../../assets/images/viber.svg");
      z-index: 2;
    }
    .whatsapp {
      background-image: url("../../assets/images/whatsapp.svg");
      z-index: 2;
    }
    .telegram {
      background-image: url("../../assets/images/telegram.svg");
      z-index: 2;
    }
    .check_phone .soc_label {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .soc_label input {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
    .tel_num {
      display: flex;
      align-items: center;
    }
    .delete_user {
      display: flex;
      margin: 0 10px;
    }
    .delete_user .remove_account {
      margin: 0 10px;
      font-size: 16px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      color: #e91d46;
      outline: none;
    }
    .delete_user .remove_icon {
      width: 24px;
      height: 24px;
      background-image: url("../../assets/images/delete_account.svg");
    }
    .avtive_btn {
      color: #04a777;
    }
</style>

