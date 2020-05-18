<template>
  <div id="results" :class="{ noMap: !displayMap }">
    <div id="map-details" :class="{ noMap: !displayMap }">
      <resource-map
        v-if="displayMap"
        :markers="markers"
        @bounds="boundsUpdated"
        @center="centerUpdated"
        @marker-selected="passSelectedMarker"
        :mapUrl="mapUrl"
        :nearLatLonZoom="nearLatLonZoom"
        :resource="resourceData"
        :zoomDiff="zoomDiff"
      />
      <div id="result-details" ref="result-details" :class="{ noMap: !displayMap }">
        <filters
          ref="filters"
          :class="{ noMap: !displayMap }"
          :need="$route.params.need"
          :markers="markers"
          :activeFilters="activeFilters"
          @box-selected="boxSelected"
        />
        <results-list
          :class="{ noMap: !displayMap }"
          :markers="markers"
          :resource="resourceData"
          @resource-selected="passSelectedMarker"
          @zoom-out="zoomOut"
          :displayMap="displayMap"
          @scroll="scroll"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { cartoBaseURL, sqlQueries, countyLatLon, booleanFilters, complexFilters, dayFilters } from '@/constants'
import ResourceMap from '@/components/ResourceMap.vue'
import ResultsList from '@/components/ResultsList.vue'
import Filters from '@/components/Filters.vue'
import { addOrRemove } from '@/utilities'
import { haversineDistance } from '@/utilities'
import { latLng } from 'leaflet'

export default {
  name: 'results',
  components: {
    ResourceMap,
    ResultsList,
    // BusinessDetails,
    Filters
  },
  data() {
    return {
      entries: null,
      mapUrl: 'https://api.mapbox.com/styles/v1/stanford-datalab/ckad39evg02u11ijqeghbn0u0/tiles/{z}/{x}/{y}?access_token=',
      bounds: null,
      centroid: [null, null],
      resourceData: { resourceId: null, isSetByMap: false },
      activeFilters: [],
      zoomDiff: 0
    }
  },
  created() {
    const query = encodeURI(sqlQueries[this.$route.params.need])
    this.fetchData(query)
  },
  methods: {
    async fetchData(query) {
      try {
        // console.log(cartoBaseURL + '&q=' + query)
        const res = await fetch(cartoBaseURL + '&q=' + query)
        const entries = await res.json()
        this.entries = entries.rows
      } catch (e) {
        console.log(e)
      }
    },
    boxSelected: function (filter) {
      this.activeFilters = addOrRemove(this.activeFilters, filter)
    },
    centerUpdated(center) {
      this.centroid = [center.lat, center.lng]
    },
    boundsUpdated: function (bounds) {
      this.bounds = bounds
    },
    passSelectedMarker: function (val) {
      this.resourceData = val
      this.showList = false
    },
    zoomOut() {
      this.zoomDiff = 2
      this.$nextTick(() => (this.zoomDiff = 0))
    },
    scroll(offset) {
      if (this.displayMap) {
        this.$refs['result-details'].scrollTo(0, offset + this.$refs['filters'].$el.offsetHeight)
      }
    }
  },
  computed: {
    currentBusiness() {
      if (this.resourceData == null || this.markers == null) {
        return null
      }
      return this.markers.length > 0 && this.resourceData.resourceId > -1
        ? this.markers.filter((c) => c.cartodb_id == this.resourceData.resourceId)[0]
        : null
    },
    displayMap() {
      const needWithMap = ['meal', 'free_grocery', 'snap_wic_retailer']
      return needWithMap.includes(this.$route.params.need) || this.activeFilters.includes('in_person')
    },
    markers() {
      if (!this.entries) {
        return null
      }
      var today = new Date().getDay()
      const dayFilter = dayFilters[today]
      let markers = this.entries

      // Filter out results based on boolean filters
      this.activeFilters.forEach((element) => {
        if (booleanFilters.includes(element)) {
          markers = markers.filter((c) => c[element] == 1)
        }
      })
      // Filter out items based on complexFilters
      complexFilters.forEach((f) => {
        if (this.activeFilters.includes(f.name)) {
          markers = markers.filter((c) => {
            const bools = f.columns.map((d) => c[d] == 1)
            return f.combine(bools)
          })
        }
      })

      markers = markers.map((c) => ({
        ...c,
        isOpen: c[dayFilter] !== '0',
        distance: haversineDistance(this.centroid, [c.lat, c.lon], true)
      })) //.sort(sortByDistance)

      if (this.activeFilters.includes('open_today')) {
        markers = markers.filter((c) => c.isOpen)
      }
      // Filter out markers based on map bounds
      if (this.displayMap && this.bounds) {
        markers = markers
          .filter((c) => c.lat && c.lon)
          .filter((c) => {
            return this.bounds.contains(latLng(c.lat, c.lon))
          })
      }
      return markers
    },
    nearLatLonZoom() {
      if (this.$route.query.near) {
        return countyLatLon[this.$route.query.near]
      }
      return countyLatLon['anywhere']
    }
  },
  watch: {
    $route: function (to, from) {
      // update entries based on need
      if (to.params && to.params.need && to.params.need != from.params.need) {
        const query = encodeURI(sqlQueries[to.params.need])
        this.activeFilters = []
        this.fetchData(query)
      }
    }
  }
}
</script>

<style type="text/css">
#results {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  position: absolute;
}

.noMap {
  position: relative !important;
}

#map-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#map-details.noMap {
  padding-top: 8px;
}

@media (min-width: 1024px) {
  #map-details {
    flex-wrap: wrap;
    padding-top: 104px;
  }

  #result-details {
    width: 50% !important;
  }

  #result-details.noMap {
    width: 100% !important;
  }
}

#result-details {
  flex: 1 1 100%;
  overflow-y: auto;
  scrollbar-color: $gray-900 $gray-700;
  width: 100%;
  z-index: 2000;
  background-color: #e9ecef;
}
</style>
