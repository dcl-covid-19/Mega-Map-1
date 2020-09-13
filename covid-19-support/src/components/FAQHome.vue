<template>
  <div id="faq">
    <h2>{{ $t('faq.title') }}</h2>
    <p class="help-text mt-4">{{ $t('faq.home_help_text') }}</p>
    <b-container>
      <b-row>
        <b-col v-for="(category, i) in category_keys" v-bind:key="i" class="category-card text-center" @click="categoryClicked(category)">
          <i class="fas" v-bind:class="categories_obj[category].icon"></i>
          <p>{{ $t(`faq.categories.${category}.title`) }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import en_json from '../locales/en.json'
export default {
  name: 'faq',
  data() {
    return {
      category_keys: Object.keys(en_json.faq.categories),
      categories_obj: en_json.faq.categories
    }
  },
  methods: {
    categoryClicked(category) {
      this.$router.push(`/faq/${category}`)
    }
  }
}
</script>

<style lang="scss">
#faq {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
  text-align: center;
}

.container {
  padding: 24px 0;
}

.category-card {
  padding: 1rem;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0);

  i {
    font-size: 2rem;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 0rem;
  }

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.125);
    background-color: white;
    cursor: pointer;
  }
}
</style>
