<template>
  <b-form id="search" @submit="onSubmit">
    <b-list-group horizontal class="need-location-group">
      <div class="searchDropdown">
        <!-- <div class="searchDropdown-label" v-if="isInitialSearch">Looking for:</div> -->
        <b-form-select v-model="need" :options="needOptions" />
        <b-form-invalid-feedback v-if="submitted" :state="selectedNeed">{{ $t('message.' + 'select_resource') }}</b-form-invalid-feedback>
      </div>
      <div class="searchDropdown">
        <!-- <div class="searchDropdown-label" v-if="isInitialSearch">Zipcode:</div> -->
        <b-form-input ref="zipcode" v-model="nearZip" :placeholder="$t('label.zipcode')" />
        <b-form-invalid-feedback v-if="submitted" :state="validZip">{{ $t('message.' + zipErroMessage) }}</b-form-invalid-feedback>
      </div>
      <b-button type="submit" variant="primary" class="search-btn"><i class="fas fa-search"></i></b-button>
    </b-list-group>
  </b-form>
</template>

<script>
import { validZipcodes } from '@/constants'
export default {
  name: 'search',
  data() {
    return {
      need: null,
      nearZip: null,
      submitted: false
    }
  },
  props: {
    needFromApp: String,
    nearLocation: String,
    // userLocation: { lat: Number, lon: Number },
    isInitialSearch: Boolean
  },
  mounted() {
    this.need = this.needFromApp
    this.nearZip = this.nearLocation
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.submitted = true
      if (this.validZip && this.selectedNeed) {
        this.$emit('search', { need: this.need, nearLocation: this.nearZip })
      }
    }
  },
  computed: {
    validZip() {
      return validZipcodes.includes(this.nearZip)
    },
    selectedNeed() {
      return this.need !== null
    },
    zipErroMessage() {
      return !this.nearZip ? 'provide_zip' : 'area_not_covered'
    },
    needOptions() {
      return [
        // Placeholder
        { value: null, text: this.$tc('sidebar.what', 1), disabled: true },
        // Food
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
        { value: 'health', text: this.$t('category.medical_resources') }
        // {
        //   label: this.$tc('category.medical_resources', 1),
        //   options: [
        //     { value: 'medical_in_person', text: this.$tc('medical.in_person_clinic', 1) },
        //     { value: 'medical_telehealth', text: this.$tc('medical.telehealth', 1) }
        //   ]
        // }
        // { value: 'blm', text: this.$t('category.blm') }
      ]
    }
  },
  watch: {
    nearZip() {
      // reset submitted state on nearLocation change
      if (this.submitted) {
        this.submitted = false
      }
    },
    need() {
      // reset submitted state on need change
      if (this.submitted) {
        this.submitted = false
      }
    },
    needFromApp(v) {
      // if invalid need, already redirect to '/'
      if (this.need != v) {
        this.need = v
        this.$refs.zipcode.focus()
      }
    },
    nearLocation(v) {
      // doesn't handle invalid zipcode
      if (validZipcodes.includes(v)) {
        this.nearZip = v
      } else {
        this.nearZip = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searchDropdown {
  width: calc(50% - 16px);
  padding: 0 2px;
  display: inline-block;
}

.search-btn {
  margin-left: 2px;
  height: 36px;
}

.searchDropdown-label {
  color: $gray-600;
  margin-bottom: 4px;
}

.custom-select,
.form-control {
  font-size: 1rem;
  width: 100%;
  border-radius: 4px;
  font-weight: 600 !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
  background-color: white !important;
}

.form-control:-webkit-autofill:focus,
.form-control:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill {
  background-color: #fff !important;
}

@media (min-width: 768px) {
  .custom-select,
  .form-control {
    font-size: 0.95rem;
  }
}

#search {
  margin: 6px auto 0;
  width: 100%;
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  z-index: 9999;
}

#search > p {
  margin: 0 auto !important;
}

.need-location-group {
  /* flex-wrap: wrap; */
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}
</style>
