<template>
  <div class="home">
    <app-header :language="language.name" @language-selected="changeLanguage" @toggled-nav-bar="toggleNavBar" />
    <blm-banner v-if="initialSearch" @blm-resource-selected="selectBlm" />
    <banner v-if="initialSearch && showBanner" @hide-banner="hideBanner" />
    <div class="intro" :class="{ 'intro-centered': initialSearch }">
      <template v-if="initialSearch">
        <h4 class="introParagraph">{{ $t('about.front-page.p1') }}</h4>
        <p class="introParagraph">{{ $t('about.front-page.p2') }}</p>
      </template>
      <search
        :needFromApp="need"
        :nearLocation="nearLocation"
        :userLocation="userLocation"
        :isInitialSearch="initialSearch"
        @search="processSearch"
        v-if="showSearchBar"
      />
      <template v-if="initialSearch">
        <p class="introParagraph introParagraph-light">{{ $t('about.front-page.p3') }}</p>
        <p class="introParagraph ux-link">
          <a :href="$t('ux_study.link_url')" target="_blank">{{ $t('ux_study.header') }}</a>
        </p>
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import Search from '@/components/Search.vue'
import Banner from '@/components/Banner.vue'
import BlmBanner from '@/components/BlmBanner.vue'
import { needs_name } from '@/constants'
export default {
  name: 'app',
  props: {
    msg: String
  },
  created() {
    // Get user location
    // this.getUserLocation()
    // Set up search from url
    if (this.$route.path == '/') {
      this.initialSearch = true
    } else {
      this.initialSearch = false
    }
    if (this.$route.params && this.$route.params.need) {
      this.need = this.$route.params.need
    }
    if (this.$route.query && this.$route.query.near) {
      this.nearLocation = this.$route.query.near
    }
  },
  components: {
    AppHeader,
    Search,
    Banner,
    BlmBanner
  },
  mounted() {
    // Check if IE
    const ua = navigator.userAgent
    const ie = ua.indexOf('MSIE') > 0 || ua.indexOf('Trident/') > 0
    if (ie) {
      alert(this.$t('message.ie_compatibility'))
    }
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      need: null,
      language: { name: 'English', iso: 'en' },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      nearLocation: null,
      userLocation: { lat: null, lon: null },
      errorStr: null,
      initialSearch: false,
      isNavBarOpen: false,
      showBanner: false
    }
  },
  methods: {
    hideBanner() {
      this.showBanner = false
    },
    processSearch({ need, nearLocation }) {
      this.need = need
      this.nearLocation = nearLocation
      this.$router.push({ path: this.need, query: { near: this.nearLocation } })
      this.initialSearch = false
    },
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },
    toggleNavBar(navBarState) {
      this.isNavBarOpen = navBarState
    },
    selectBlm() {
      this.need = 'blm'
    }
  },
  computed: {
    showSearchBar() {
      if (this.$route.name == 'AboutUs' || this.$route.name == 'BlmStatement') {
        return false
      }
      return !this.isNavBarOpen || this.initialSearch
    }
  },
  watch: {
    $route(to) {
      // update need based on route
      if (to.path == '/') {
        this.initialSearch = true
        this.showBanner = true
        this.need = null
        this.nearLocation = null
      } else {
        // catch all - redirect to '/' - needs to be fixed atm I need to add any new page to this list!
        if (!needs_name.includes(to.params.need) && !['/about-us', '/blm-statement'].includes(to.path)) {
          this.$router.push('/')
        } else {
          this.initialSearch = false
          if (to.params.need) {
            this.need = to.params.need
          }
          if (to.query.near) {
            this.nearLocation = to.query.near
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
h5,
span {
  text-align: center;
  width: 300px;
  margin: 0 auto;
  font-weight: 300 !important;
  padding-top: 50px !important;
  padding-bottom: 20px !important;
}

.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: theme-color(secondary);
  overflow-y: scroll;
}

.intro {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 12px;
  z-index: 600;
}

.intro-centered {
  margin: 5vh auto;
}

@media (min-width: 600px) {
  .intro-centered {
    margin: 10vh auto;
  }
}

.introParagraph {
  padding: 24px 8px 10px;
}

.introParagraph-light {
  color: $gray-600;
}

#search-result {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
}

.ux-link {
  text-align: center;
  text-decoration: underline;
  font-weight: 600 !important;
}
</style>
