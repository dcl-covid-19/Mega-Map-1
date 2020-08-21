<template>
  <div class="resultWrapper" ref="results">
    <div v-if="fetchDataState === StatusEnum.loading" class="no-result">
      {{ $tc('message.loading') }}
    </div>
    <div v-if="fetchDataState === StatusEnum.error" class="no-result">
      {{ $tc('message.error_loading_results') }}
    </div>
    <div v-if="isEmpty && displayMap" class="no-result">
      {{ $tc('message.no_location_in_this_area') }}
      <a class="more-result" @click="zoomOut" v-if="displayMap">{{ $tc('label.zoom_out_for_more_results') }}</a>
    </div>
    <div v-if="isEmpty && !displayMap" class="no-result">{{ $tc('message.no_location_meet_these_criteria') }}</div>
    <div v-if="fetchDataState === StatusEnum.loaded" class="resultList">
      <div
        v-for="item in markers"
        v-bind:key="item.cartodb_id"
        class="resultItem"
        :class="{ selected: item.cartodb_id == resource.resourceId, closedOne: item.isOpen == false }"
        :ref="'result' + item.cartodb_id"
        @click="resourceClicked(item)"
      >
        <div>
          <div class="resultTop">
            <div>
              <template v-if="!!item.provider_addloc">
                <div class="addloc">{{ item.provider_addloc }}</div>
              </template>
              <div class="resultMetadata">
                <span class="resultTitle">{{ item.provider_name }}</span>
                <span v-if="!!item.address" class="resultAddress">
                  {{ item.address }}
                  <span v-if="!!item.city">, {{ item.city }}</span>
                </span>
                <span>
                  <a class="resultContact" :href="'tel:' + item.contact">{{ item.contact }}</a>
                </span>
                <!-- Legal resource description -->
                <span v-if="(legalResources || medicalResources || mentalResources) && !!item.notes" class="resultNotes">
                  <b>{{ $t('label.notes') }}:</b>
                  {{ getTranslation(item, 'notes') }}
                </span>
                <!-- End Legal resource description -->
              </div>
              <!-- Badges -->
              <div v-for="(badge, index) in badgeList" v-bind:key="index" class="badges">
                <template v-if="badge.var == 'open_today'">
                  <span v-if="!item.isOpen" class="badge closed">{{ getClosedMessage() }}</span>
                  <span v-if="item.isOpen" class="badge open">{{ getOpenMessage(item) }}</span>
                </template>
                <template v-else>
                  <span v-if="item[badge.var] == 1" class="badge">{{ $t(badge.label) }}</span>
                </template>
              </div>
              <!-- End Badges -->
            </div>
            <i class="fas fa-chevron-right fa-lg" :class="{ 'fa-rotate-90': showDetails && item.cartodb_id == resource.resourceId }"></i>
          </div>
          <template v-if="item.cartodb_id == resource.resourceId && showDetails">
            <business-details
              :business="item"
              :legalResources="legalResources"
              :medicalResources="medicalResources"
              :mentalResources="mentalResources"
            />
            <p>
              <b-button @click="(e) => e.stopPropagation()" class="btn btn-outline-primary btn-sm" v-b-modal.suggest-edit-modal>
                {{ $t('label.suggest_an_edit') }}
              </b-button>
            </p>
          </template>
        </div>
      </div>
      <a class="more-result bottom" @click="zoomOut" v-if="displayMap">{{ $tc('label.zoom_out_for_more_results') }}</a>
    </div>
    <b-modal id="suggest-edit-modal" :title="$t('label.suggest_an_edit')">
      <edit-form :location="locationToEdit" @close-edit-form="closeEditModal" />
    </b-modal>
  </div>
</template>
<script>
import BusinessDetails from '@/components/BusinessDetails.vue'
import { StatusEnum } from '@/components/Results.vue'
import EditForm from '@/components/EditForm.vue'
import { needs } from '@/resources/resources.js'

export default {
  name: 'ResultsList',
  data() {
    return {
      StatusEnum,
      selected: false,
      today: new Date().getDay(),
      showDetails: false,
      locationToEdit: null
    }
  },
  components: {
    BusinessDetails,
    EditForm
  },
  props: {
    fetchDataState: Number, // enum
    markers: Array,
    resource: { resourceId: Number, isSetByMap: Boolean },
    displayMap: Boolean
  },
  watch: {
    resource: function (val) {
      // if no resource are selected, hide location details
      if (!val.resourceId) {
        this.showDetails = false
        this.locationToEdit = null
        // a location is selected, keep the list scrolled to that location
      } else {
        this.showDetails = true
        this.locationToEdit = this.markers.filter((m) => m.cartodb_id == val.resourceId)[0]
        this.$nextTick(() => {
          const top = this.$refs['result' + val.resourceId][0].offsetTop - this.$refs['result' + this.markers[0].cartodb_id][0].offsetTop
          this.$emit('scroll', top)
        })
      }
    }, //,
    markers: function (newMarkers) {
      // some location is selected and there are displayed markers
      if (this.resource.resourceId && newMarkers) {
        // is the selected location still in the map view
        const selectedLocationInView =
          newMarkers.filter((c) => {
            return c.cartodb_id == this.resource.resourceId
          }).length > 0
        // if it's not in view, clear selection
        if (!selectedLocationInView) {
          this.$emit('resource-selected', { resourceId: null, isSetByMap: false })
          // if it's in view, scroll to it after the update on the markers
        } else {
          this.$nextTick(() => {
            const top =
              this.$refs['result' + this.resource.resourceId][0].offsetTop - this.$refs['result' + newMarkers[0].cartodb_id][0].offsetTop
            this.$emit('scroll', top)
          })
        }
      }
    }
  },
  methods: {
    getClosedMessage() {
      return this.$t('label.closed-today')
    },
    getOpenMessage() {
      return this.$t('label.open_today')
    },
    getTranslation(item, field) {
      if (this.$i18n.locale != 'en' && item[field + '_' + this.$i18n.locale]) {
        return item[field + '_' + this.$i18n.locale]
      }
      return item[field]
    },
    resourceClicked(item) {
      if (!this.resource.resourceId || item.cartodb_id != this.resource.resourceId) {
        this.$emit('resource-selected', { resourceId: item.cartodb_id, isSetByMap: false })
      } else {
        this.showDetails = !this.showDetails
      }
    },
    zoomOut() {
      this.$emit('zoom-out')
      this.showDetails = false
    },
    closeEditModal() {
      setTimeout(() => this.$bvModal.hide('suggest-edit-modal'), 1500)
    }
  },
  computed: {
    isEmpty() {
      return this.fetchDataState === StatusEnum.loaded && this.markers.length == 0
    },
    legalResources() {
      return this.$route.params.need.startsWith('legal')
    },
    medicalResources() {
      return this.$route.params.need.startsWith('health')
    },
    mentalResources() {
      return this.$route.params.need.startsWith('mental')
    },
    badgeList() {
      return needs[this.$route.params.need].badges
    }
  }
}
</script>
<style lang="scss">
.resultWrapper {
  flex: 1 1 100%;
  scrollbar-color: $gray-900 $gray-700;
  width: 100%;
  z-index: 2000;
  padding: 8px;
  background-color: $gray-200;
}

@media (min-width: 1024px) {
  .more-result {
    width: 50% !important;
    left: 50% !important;
  }
}

.resultTop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: inherit;
}
.rotated {
  color: red;
}
.addloc {
  padding-bottom: 3px;
  color: $gray-600;
  font-size: 0.8rem;
}
.resultList {
  z-index: 2000;
  width: 100%;
  padding-bottom: 28px;
}
.more-info {
  padding-right: 10px;
}
.resultItem {
  padding: 16px;
  width: 100%;
  display: block;
  flex: 1 1 auto;
  border: solid 1px rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  font-size: 0.8rem;
  background: white;
  margin-bottom: 8px;
  /* @media (prefers-color-scheme: dark) {
    color: $gray-100;
    background: $gray-800;
  } */
  &.selected {
    background: white !important;
    border-color: $gray-500;
  }
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    /* @media (prefers-color-scheme: dark) {
      background: $gray-900;
    } */
  }
}
.resultTitle {
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin: 0 0 4px;
}
.resultMetadata {
  margin-bottom: 12px;
}
.resultAddress {
  display: block;
  max-width: 300px;
  margin-bottom: 4px;
}
.resultContact {
  display: block;
  margin-bottom: 4px;
}
.resultNotes {
  display: block;
  /* max-width: 300px; */
  margin-bottom: 4px;
}
.badge {
  display: inline-block;
  border-radius: 100px;
  background-color: white;
  border: 1px solid $gray-400;
  color: grey;
  padding: 2px 6px;
  margin-bottom: 8px;
  margin-right: 5px;
  font-size: 0.7rem;
}
.closed {
  border-color: $gray-700;
  background-color: $gray-700;
  color: white;
}
.no-result {
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
}
.more-result {
  font-size: 0.9rem;
  font-weight: 600;
  color: theme-color(primary) !important;
  cursor: pointer;
}

.more-result:hover {
  text-decoration: underline !important;
}

.bottom {
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.125);
  z-index: 99997;
  padding: 8px 0;
  text-align: center;
  background-color: white;
}
.more-info {
  align-content: flex-end;
}

.modal-footer {
  display: none !important;
}

.badges {
  display: inline-block;
}
</style>
