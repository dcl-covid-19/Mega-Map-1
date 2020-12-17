<template>
  <div v-if="filterList[0] != null" class="filters">
    <div v-for="(item, index) in filterList" v-bind:key="index" class="filter">
      <template v-if="!Array.isArray(item)">
        <b-form-checkbox v-model="selected" :value="item.var" @change="$emit('box-selected', item.var)">
          {{ $tc(item.label, 2) }}
        </b-form-checkbox>
      </template>
      <template v-else>
        <div v-b-toggle="'f_' + index" :ref="'f_' + index" @click="toggleChevron" class="collapse-toggle">
          {{ $t(item[0]) }}
          <i class="fas fa-chevron-right"></i>
        </div>

        <b-collapse :id="'f_' + index" class="collapse-toggle-content">
          <b-form-checkbox
            v-for="(item_sub, index_sub) in item.slice(1)"
            v-model="selected"
            v-bind:key="'' + index + '_' + index_sub"
            :value="item_sub.var"
            @change="$emit('box-selected', item_sub.var)"
          >
            {{ $tc(item_sub.label, 2) }}
          </b-form-checkbox>
        </b-collapse>
      </template>
    </div>
    <b-button id="apply" variant="primary" class="mb-2" @click="$emit('close-filters')">{{ $t('label.apply') }}</b-button>
    <b-button id="reset" variant="danger" @click="$emit('reset-filters')">{{ $t('label.reset') }}</b-button>
  </div>
</template>

<script>
import { needs } from '@/resources/resources.js'
export default {
  name: 'Filters',
  props: {
    markers: Array,
    activeFilters: Array
  },
  data() {
    return {
      selected: []
    }
  },
  mounted() {
    this.selected = this.activeFilters
    if (this.selected.length > 0) {
      this.filterList.forEach((fs, i) => {
        if (Array.isArray(fs)) {
          if (fs.slice(1).some((f) => this.selected.includes(f.var))) {
            this.$root.$emit('bv::toggle::collapse', 'f_' + i)
            console.log(this.$refs['f_' + i][0])
            this.$refs['f_' + i][0].getElementsByTagName('i')[0].classList.toggle('fa-rotate-90')
          }
        }
      })
    }
  },
  methods: {
    boxSelected: function (content) {
      this.$emit('box-selected', content)
    },
    toggleChevron(evt) {
      if (evt.target.tagName == 'I') {
        evt.target.classList.toggle('fa-rotate-90')
      } else {
        evt.target.getElementsByTagName('i')[0].classList.toggle('fa-rotate-90')
      }
    }
  },
  watch: {
    activeFilters: function (val) {
      if (val.length == 0) {
        this.selected = []
      }
    }
  },
  computed: {
    need() {
      return needs[this.$route.params.need]
    },
    // Displayed filters
    filterList() {
      switch (this.need) {
        // case 'free_grocery':
        //   return [
        //     // { var: 'children', label: 'label.children' },
        //     // { var: 'seniors', label: 'label.seniors' },
        //     { var: 'open_today', label: 'label.open_today' }
        //     // { var: 'safe_pick_up', label: 'label.safe_pick_up' }
        //   ]
        case 'snap_wic_retailer':
          return [
            { var: 'wic', label: 'label.wic' },
            { var: 'special_hours', label: 'label.special_hours' },
            { var: 'safe_pick_up', label: 'label.safe_pick_up' },
            { var: 'farmers_market', label: 'label.farmers_market' }
          ]
        // case 'meal':
        //   return [
        //     { var: 'children', label: 'label.children' },
        //     // { var: 'seniors', label: 'label.seniors' },
        //     { var: 'open_today', label: 'label.open_today' }
        //     // { var: 'safe_pick_up', label: 'label.safe_pick_up' }
        //   ]
        case 'school_meal':
          return [
            { var: 'open_today', label: 'label.open_today' },
            // { var: 'require_child', label: 'label.require_child' },
            // { var: 'must_show_id', label: 'label.must_show_id' },
            { var: 'all_children', label: 'label.all_children' },
            { var: 'enrolled_children', label: 'label.enrolled_children' }
          ]
        case 'free_food':
          return [
            { var: 'open_today', label: 'label.open_today' }
            // { var: 'safe_pick_up', label: 'label.safe_pick_up' }
          ]
        case 'mental_health':
          return [
            // { var: 'free', label: 'label.free' },
            { var: 'in_person', label: 'label.in_person' },
            { var: 'telehealth', label: 'label.telehealth' }
          ]
        case 'legal_assistance':
          return [
            { var: 'legal_criminal', label: 'legal.legal_criminal' },
            { var: 'legal_domviolence', label: 'legal.legal_domviolence' },
            { var: 'legal_worker_protection', label: 'legal.legal_worker_protection' },
            { var: 'legal_healthcare', label: 'legal.legal_healthcare' },
            { var: 'legal_housing', label: 'legal.legal_housing' },
            { var: 'legal_immigration', label: 'legal.legal_immigration' }
          ]
        case 'health':
          return [
            { var: 'in_person', label: 'label.in_person' },
            { var: 'telehealth', label: 'label.telehealth' },
            { var: 'med_testing', label: 'health.med_testing' },
            { var: 'med_primary_care', label: 'health.med_primary_care' },
            { var: 'med_pediatrics', label: 'health.med_pediatrics' },
            { var: 'med_senior', label: 'health.med_senior' },
            { var: 'med_women', label: 'health.med_women' },
            { var: 'med_urgent_care', label: 'health.med_urgent_care' },
            { var: 'med_dental', label: 'health.med_dental' },
            { var: 'med_vision', label: 'health.med_vision' },
            { var: 'med_pharmacy', label: 'health.med_pharmacy' },
            { var: 'med_mental_health', label: 'health.med_mental_health' },
            { var: 'med_hotline', label: 'health.med_hotline' },
            { var: 'med_addiction', label: 'health.med_addiction' },
            { var: 'med_domestic_violence', label: 'health.med_domestic_violence' }
          ]
        case 'ballot_drop':
          return [
            { var: 'ballot_outdoor', label: 'label.ballot_outdoor' },
            { var: 'ballot_indoor', label: 'label.ballot_indoor' },
            { var: 'twentyfourhrs', label: 'label.twentyfourhrs' }
          ]
        case 'cash_assistance':
          return [
            { var: 'fin_grocery', label: 'label.fin_grocery' },
            { var: 'fin_housing', label: 'label.fin_housing' },
            { var: 'fin_legal', label: 'label.fin_legal' },
            { var: 'fin_medical', label: 'label.fin_medical' },
            { var: 'fin_utilities', label: 'label.fin_utilities' }
          ]
        default:
          return [null]
      }
      return [null]
    }
  }
}
</script>

<style lang="scss">
.filter {
  position: relative;
  justify-content: space-evenly;
  z-index: 3000;
  width: 100%;
  font-size: 0.8em;
  padding: 8px 16px;
  background-color: $gray-100;
  border-radius: 4px;
  margin-bottom: 8px;
}

.filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-checkbox {
  color: #495057;
  margin-bottom: 4px;
  width: 80%;
  display: inline-block !important;
  line-height: 1;
}

.custom-control-label {
  padding-top: 5px;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: theme-color(primary);
  border-color: rgba(0, 0, 0, 0.3);
}

.collapse-toggle {
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.collapse-toggle-content {
  padding-left: 8px;
}

#apply {
  margin-top: 15px;
}
</style>
