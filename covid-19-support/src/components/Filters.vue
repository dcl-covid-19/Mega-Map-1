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
      if (this.need.filters.length > 0) {
        return this.need.filters
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
