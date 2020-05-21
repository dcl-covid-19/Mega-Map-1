<template>
  <div class="home">
    <app-header :language="language.name" @language-selected="changeLanguage" @toggled-nav-bar="toggleNavBar" />
    <div class="intro" :class="{ 'intro-centered': initialSearch }">
      <template v-if="initialSearch">
        <h4 class="introParagraph">{{ $t('about.front-page.p1') }}</h4>
        <p class="introParagraph">{{ $t('about.front-page.p2') }}</p>
      </template>
      <search
        :need="need"
        :nearLocation="nearLocation"
        :userLocation="userLocation"
        :isInitialSearch="initialSearch"
        @need-selected="needSelected"
        @near-location-selected="nearLocationSelected"
        v-if="showSearchBar"
      />
      <template v-if="initialSearch">
        <p class="introParagraph introParagraph-light">{{ $t('about.front-page.p3') }}</p>
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import Search from '@/components/Search.vue'
import { needs } from '@/constants'
export default {
  name: 'app',
  props: {
    msg: String
  },
  created() {
    // Get user location
    // this.getUserLocation()
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
    Search
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
      isNavBarOpen: false
    }
  },
  methods: {
    needSelected: function (val) {
      this.need = val
      if (this.nearLocation) {
        this.$router.push({ path: this.need, query: { near: this.nearLocation } })
        this.initialSearch = false
      }
      // window.gtag('event', 'What do you need?', { event_category: 'Search - (' + this.language.name + ')', event_label: val })
    },
    nearLocationSelected: function (val) {
      this.nearLocation = val
      if (this.nearLocation && this.need) {
        this.$router.push({ path: this.need, query: { near: this.nearLocation } })
        this.initialSearch = false
      }
    },
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },
    async getUserLocation() {
      try {
        const location = await this.requestUserLocation()
        this.userLocation = { lon: location.coords.longitude, lat: location.coords.latitude }
      } catch (e) {
        this.errorStr = e.message
      }
    },
    async requestUserLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          (err) => reject(err)
        )
      })
    },
    toggleNavBar(navBarState) {
      this.isNavBarOpen = navBarState
    }
  },
  computed: {
    showSearchBar() {
      if (this.$route.name == 'AboutUs') {
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
        this.need = null
        this.nearLocation = null
      } else {
        console.log(to)
        if (!needs.includes(to.params.need) && to.path != '/about-us') {
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
  z-index: 99998;
}

.intro-centered {
  margin: 10vh auto;
}

@media (min-width: 600px) {
  .intro-centered {
    margin: 15vh auto;
  }
}

.introParagraph {
  padding: 24px 8px 0;
}

.introParagraph-light {
  color: $gray-600;
}

#search-result {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
}
</style>
