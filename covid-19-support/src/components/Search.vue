<template>
  <div id="search">
    <b-list-group horizontal class="need-location-group">
      <div class="searchDropdown">
        <!-- <div class="searchDropdown-label" v-if="isInitialSearch">Looking for:</div> -->
        <b-form-select :value="need" :options="needOptions" @change="(opt) => $emit('need-selected', opt)" />
      </div>
      <div class="searchDropdown">
        <!-- <div class="searchDropdown-label" v-if="isInitialSearch">County:</div> -->
        <b-form-select :value="nearLocation" :options="locationOptions" @change="(opt) => $emit('near-location-selected', opt)" />
      </div>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      location: null
    }
  },
  props: {
    need: String,
    nearLocation: String,
    userLocation: { lat: Number, lon: Number },
    isInitialSearch: Boolean
  },
  computed: {
    needOptions() {
      return [
        { value: null, text: this.$tc('sidebar.what', 1), disabled: true },
        {
          label: this.$tc('category.food_resources', 1),
          options: [
            { value: 'meal', text: this.$tc('category.meal', 2) },
            { value: 'free_grocery', text: this.$tc('category.free_grocery', 2) },
            { value: 'snap_wic_retailer', text: this.$tc('category.snap_wic_retailer', 2) }
          ]
        },
        { value: 'legal_assistance', text: this.$tc('category.legal_resources', 1) },
        // {
        //   label: this.$tc('category.legal_resources', 1),
        //   options: [
        //     // { value: 'legal_general_info', text: this.$tc('legal.general_info', 1) },
        //     { value: 'legal_assistance', text: this.$tc('legal.legal_assistance', 1) }
        //   ]
        // },
        { value: 'mental_health', text: this.$t('category.mental_health_resources') },
        // {
        //   label: this.$tc('category.mental_health_resources', 1),
        //   options: [
        //     { value: 'mental_health_in_person', text: this.$tc('mental.in_person', 1) },
        //     { value: 'mental_health_telehealth', text: this.$tc('mental.telehealth', 1) }
        //   ]
        // },
        { value: 'medical', text: this.$t('category.medical_resources') }
        // {
        //   label: this.$tc('category.medical_resources', 1),
        //   options: [
        //     { value: 'medical_in_person', text: this.$tc('medical.in_person_clinic', 1) },
        //     { value: 'medical_telehealth', text: this.$tc('medical.telehealth', 1) }
        //   ]
        // }
      ]
    },
    locationOptions() {
      let locations = [
        { value: null, text: this.$tc('sidebar.where', 1), disabled: true },
        { value: 'anywhere', text: this.$tc('county.anywhere', 1) },
        { value: 'alameda', text: this.$tc('county.alameda', 1) },
        { value: 'contra_costa', text: this.$tc('county.contra-costa', 1) },
        { value: 'marin', text: this.$tc('county.marin', 1) },
        { value: 'monterey', text: this.$t('county.monterey') },
        { value: 'napa', text: this.$tc('county.napa', 1) },
        { value: 'san_francisco', text: this.$tc('county.san-francisco', 1) },
        { value: 'san_mateo', text: this.$tc('county.san-mateo', 1) },
        { value: 'santa_clara', text: this.$tc('county.santa-clara', 1) },
        { value: 'solano', text: this.$tc('county.solano', 1) },
        { value: 'sonoma', text: this.$tc('county.sonoma', 1) }
      ]
      // uncomment to enable user current location
      // if (this.userLocation && this.userLocation.lat && this.userLocation.lon) {
      //   locations.splice(1, 0, { value: 'current-location', text: this.$tc('sidebar.current_location', 1) })
      // }

      return locations
    }
  }
}
</script>

<style lang="scss" scoped>
.searchDropdown {
  width: 50%;
  padding: 0 8px;
  display: inline-block;
}

.searchDropdown-label {
  color: $gray-600;
  margin-bottom: 4px;
}

.custom-select {
  font-size: 1rem;
  width: 100%;
  border-radius: 4px;
  font-weight: 600 !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
}

@media (min-width: 768px) {
  .custom-select {
    font-size: 0.95rem;
  }
}

#search {
  margin: 6px auto 0;
  width: 100%;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  z-index: 9999;
}

#search > p {
  margin: 0 auto !important;
}

.need-location-group {
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}
</style>
