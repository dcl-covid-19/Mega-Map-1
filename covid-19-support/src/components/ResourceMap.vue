<template>
  <div class="map">
    <l-map
      ref="covidMap"
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%; width: 100%;"
      @update:center="centerUpdated"
      @update:zoom="(val) => (zoom = val)"
      @update:bounds="boundsUpdated"
    >
      <l-control position="bottomright">
        <div class="mapkey" :class="{ 'show-key': showKey }">
          <div class="title-block">
            <i @click="showKey = !showKey" class="fas fa-info-circle" />
          </div>
          <div class="keys" :class="{ 'show-key': showKey }">
            <icon-list-item :image="require('../images/Blue.png')" :title="$t('label.open_today')" link="" />
            <icon-list-item :image="require('../images/Grey.png')" :title="$t('label.closed-today')" link="" />
            <icon-list-item :image="require('../images/Red.png')" :title="$t('label.selected')" link="" />
          </div>
        </div>
      </l-control>
      <l-tile-layer :url="mapUrl" :tileSize: 512 zoomOffset: -1 attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
      <v-marker-cluster ref="marks" :options="clusterOptions">
        <!-- @clusterclick="click()" @ready="ready" -->
        <l-marker
          :lat-lng="latLng(item.lat, item.lon)"
          :icon="selectedIcon(item.cartodb_id === resource.resourceId, item)"
          v-for="item in markers"
          v-bind:key="item.cartodb_id"
          @click="$emit('marker-selected', { resourceId: item.cartodb_id, isSetByMap: true })"
        >
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControl } from 'vue2-leaflet'
// import { LMap, LTileLayer, LControl } from 'vue2-leaflet'
import { latLng, Icon, ExtraMarkers } from 'leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import { openStreetMapAttribution as attribution } from '@/constants'
import IconListItem from '@/components/IconListItem.vue'
import { businessIcon } from '@/utilities'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'ResourceMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    IconListItem
  },
  props: {
    markers: Array,
    mapUrl: String,
    nearLatLonZoom: { lat: Number, lon: Number, zoom: Number },
    resource: { resourceId: Number, isSetByMap: Boolean },
    zoomDiff: Number
  },
  data() {
    return {
      center: latLng(37.594, -122.223),
      zoom: 10,
      showParagraph: true,
      mapOptions: { zoomSnap: 0.5, setView: true },
      showMap: true,
      attribution,
      locationData: location,
      clusterOptions: { spiderfyOnMaxZoom: true, maxClusterRadius: 40, disableClusteringAtZoom: 16 },
      showKey: false
    }
  },
  created() {
    if (!!this.nearLatLonZoom.lat && !!this.nearLatLonZoom.lon) {
      this.center = latLng(this.nearLatLonZoom.lat, this.nearLatLonZoom.lon)
      this.zoom = this.nearLatLonZoom.zoom
    }
  },
  mounted() {
    this.editZoomControl()
    this.$nextTick(() => {
      this.$emit('bounds', this.$refs.covidMap.mapObject.getBounds())
    })
    // console.log("in ResourceMap mounted")
    // console.log(this.userLocation)
    // this.centerOnUserLocation()
  },
  methods: {
    centerUpdated(center) {
      this.center = center
      this.$emit('center', center)
    },
    boundsUpdated(bounds) {
      this.$emit('bounds', bounds)
    },
    editZoomControl() {
      const zoomControl = this.$el.querySelector('.leaflet-top.leaflet-left')
      zoomControl.className = 'leaflet-bottom leaflet-left'
    },
    latLng,
    selectedIcon(selected, item) {
      let markerColor = item.isOpen ? '#566ca9' : '#999'
      const iconClasses = businessIcon(item)
      if (selected) {
        markerColor = '#ff3d3d'
      }
      var markerIcon = ExtraMarkers.icon({
        markerColor,
        icon: iconClasses,
        prefix: 'fa',
        svg: true
      })
      return markerIcon
    }
  },
  watch: {
    resource: function (newResource) {
      if (newResource.isSetByMap || !newResource.resourceId) {
        return
      }
      var item = this.markers.filter((c) => c.cartodb_id == newResource.resourceId)[0]
      this.$refs.covidMap.mapObject.flyTo(latLng(item.lat, item.lon), 16, { animate: true, duration: 1 })
    },
    nearLatLonZoom: function (newVal, oldVal) {
      if (!newVal || !newVal.lat || !newVal.lon || (newVal.lat == oldVal.lat && newVal.lon == oldVal.lon)) {
        return
      }
      this.$refs.covidMap.mapObject.setView(latLng(newVal.lat, newVal.lon), newVal.zoom, { duration: 1 })
    },
    zoomDiff: function (val) {
      if (val > 0) {
        this.$refs.covidMap.mapObject.zoomOut(val, { duration: 1 })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.map {
  flex: 1 1 100%;
  width: 100%;
  padding: 0;
  z-index: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

@media (min-width: 1024px) {
  .map {
    height: 100%;
    width: 50%;
    border-right: 1px solid rgba(0, 0, 0, 0.125);
  }
}

.mapkey {
  padding: 2px;

  &.show-key {
    background-color: #f8f9fa !important;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  i {
    font-size: 1rem;
    opacity: 0.6;
    color: #000;
    cursor: pointer;
    vertical-align: middle;
  }

  &.show-key i {
    opacity: 0.8;
  }
}

.title-block {
  width: 16px;
  height: 16px;
  text-align: right;
  bottom: 4px;
  right: 2px;
  position: absolute;
}

.mapkey .title {
  vertical-align: middle;
  margin: 0 8px;
  display: none;
}

.keys {
  display: none;
}

.show-key {
  display: block;
}

.mapkey.show-key .title {
  /* display: inline; */
}
</style>
