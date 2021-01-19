<template>
  <div class="locale_section_web" v-if="!isMobile">
<!--    {{ currentLanguage }}-->
    <div class="icon" @click="toggleDropDown"><img src="@/assets/images/icons/am.png" alt=""><img style="margin: 0 8px" src="@/assets/images/icons/arrow-down.svg" alt=""></div>
    <div class="locale_dropdown" v-if="dropdownVisibility">
      <ul>
        <li v-for="language in languages" :key="language.id" @click.prevent="setLocale(language.code)">{{ language.code }}</li>
      </ul>
    </div>
  </div>
  <div v-else>
    <div class="locale_section_mobile" v-if="!isMobile">
      <div class="icon" @click="toggleDropDown"><img src="@/assets/images/icons/am.png" alt=""><img style="margin: 0 8px" src="@/assets/images/icons/arrow-down.svg" alt=""></div>
      <div class="locale_dropdown" v-if="dropdownVisibility">
        <ul>
          <li v-for="language in languages" :key="language.id" @click.prevent="setLocale(language)">{{ language.name }}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
// import { mapGetters } from 'vuex'
// import gql from "graphql-tag";
import { loadMessages } from '@/plugins/i18n'

export default {
  name: 'local-dropdown',
  data: function() {
    return {
      dropdownVisibility: false,
      languages: {},
      currentLanguage: {}
    }
  },
  props: {
    isMobile: Boolean
  },
  // computed: mapGetters({
  //   locale: 'lang/locale',
  //   locales: 'lang/locales'
  // }),
  // apollo: {
  //
  //   languages: {
  //     variables() {
  //       return {
  //           orderBy : [
  //             {field: "id",order: 'ASC'},
  //           ],
  //       }
  //     },
  //     query: gql`query ($orderBy: [OrderByClause!]) {
  //       languages(orderBy: $orderBy) {
  //           id
  //           name
  //           code
  //       }
  //     }`,
  //     result(data) {
  //       this.languages = data.data.languages
  //       console.log('Apollo languages result')
  //       if(!this.locale) {
  //         console.log('Apollo languages if(this.locale === null)')
  //         // this.$store.dispatch('lang/setLocales', data.data.languages )
  //         // this.$store.dispatch('lang/setLocale')
  //         // this.$store.dispatch('lang/setLocale', data.data.languages[0].code )
  //
  //         this.currentLanguage = data.data.languages[0]
  //         console.log(1,this.currentLanguage)
  //       }
  //     }
  //   },
  // },
  methods: {
    setLocale (locale) {
      console.log('dwadwa',locale)
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)
        this.$store.dispatch('lang/setLocale', locale)
        this.currentLanguage = locale
        console.log(2,this.currentLanguage)
      }
      this.toggleDropDown()
    },
    toggleDropDown: function() {
      this.dropdownVisibility = !this.dropdownVisibility;
    }
  },
  beforeCreate() {
    console.log('%c component: components/locale-dropdplown.vue BEFORE CREATE ', 'background: green; color: white');
  },
  mounted() {
    console.log('%c component: components/locale-dropdown MOUNTED ', 'background: green; color: white');
    this.currentLanguage = this.$store.getters['lang/locale']
    this.languages = this.$store.getters['lang/locales']
    // console.log('locale from vuex', this.locale)
    // console.log('locales from vuex', this.locales)
    console.log('locale from vuex',this.currentLanguage)
    console.log('locales from vuex',this.languages)
    // console.log(this.languages.locales)
  }
}
</script>
<style scoped>

  .locale_section_web {
    position: relative;
  }
  .locale_dropdown {
    position: absolute;
  }

  .locale_dropdown li{
    cursor: pointer;
    list-style: none;
    font-weight: bold;
  }
  .locale_section_web .icon {
    display: flex;
    cursor: pointer;
  }
  li {
    cursor: pointer;
    background-color: #b3c7f5;
    border: 1px solid black;
  }
</style>
