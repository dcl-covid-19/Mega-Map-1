<template>
  <div>
    <template v-if="link != ''">
      <div class="iconListItem">
        <div class="ilIcon">
          <i class="fas" v-bind:class="icon" v-if="icon != ''"></i>
          <img :src="image" v-if="icon == null || icon == ''" />
        </div>
        <div class="ilTitle" :class="{ 'map-legend': map }">
          <a :href="link" v-if="link != null && link != ''">
            <span class="title">{{ title }}</span>
          </a>
          <span class="title" v-if="link == null || link == ''">{{ title }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="iconListItem">
        <div class="ilIcon">
          <i class="fas" v-bind:class="icon" v-if="icon != ''"></i>
          <img :src="image" v-if="icon == null || icon == ''" />
        </div>
        <div class="ilTitle" :class="{ 'map-legend': map }">
          <span class="title">{{ title }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'IconListItem',
  data() {
    return {
      selected: false
    }
  },
  props: {
    title: { type: String },
    link: { type: String },
    icon: { type: String },
    image: { type: String },
    map: Boolean
  }
}
</script>

<style lang="scss">
.iconListItem {
  div {
    display: inline-block;
    line-height: 1rem;
    vertical-align: middle;
    margin: 4px 2px;
  }
}

.ilIcon {
  font-size: 1rem;
  width: 15px;
  color: $teal;
}

.ilIcon > img {
  width: 15px;
}

.ilTitle {
  width: 240px;
  padding-left: 10px;
}

.map-legend {
  width: 80px;
  padding-left: 5px;
}
</style>
