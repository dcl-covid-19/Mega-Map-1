<template>
  <div class="filters" v-if="filterList[0] != null">
    <b-form-checkbox
      v-for="(item, index) in filterList"
      v-model="selected"
      v-bind:key="index"
      :value="item.var"
      @change="$emit('box-selected', item.var)"
    >
      {{ $tc(item.label, 2) }}
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    need: String,
    markers: Array,
    activeFilters: Array
  },
  data() {
    return {
      selected: []
    }
  },
  methods: {
    boxSelected: function (content) {
      this.$emit('box-selected', content)
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
    // Displayed filters
    filterList() {
      switch (this.need) {
        case 'free_grocery':
          return [
            { var: 'children', label: 'label.children' },
            { var: 'seniors', label: 'label.seniors' },
            { var: 'open_today', label: 'label.open_today' },
            { var: 'safe_pick_up', label: 'label.safe_pick_up' }
          ]
        case 'snap_wic_retailer':
          return [
            { var: 'wic', label: 'label.wic' },
            { var: 'special_hours', label: 'label.special_hours' },
            { var: 'safe_pick_up', label: 'label.safe_pick_up' },
            { var: 'farmers_market', label: 'label.farmers_market' }
          ]
        case 'meal':
          return [
            { var: 'children', label: 'label.children' },
            { var: 'seniors', label: 'label.seniors' },
            { var: 'open_today', label: 'label.open_today' },
            { var: 'safe_pick_up', label: 'label.safe_pick_up' }
          ]
        case 'mental_health':
          return [
            // { var: 'free', label: 'label.free' },
            { var: 'in_person', label: 'label.in_person' },
            { var: 'telehealth', label: 'label.telehealth' }
          ]
        case 'medical':
          return [
            { var: 'free', label: 'label.free' },
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
        default:
          return [null]
      }
    }
  }
}
</script>

<style lang="scss">
.filters {
  position: relative;
  justify-content: space-evenly;
  z-index: 3000;
  width: 100%;
  font-size: 0.8em;
  padding: 8px 16px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
}

.custom-checkbox {
  color: #495057;
  background: white;
  margin-bottom: 4px;
  width: 50%;
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
</style>
