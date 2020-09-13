<template>
  <b-container id="faq-mid">
    <h2 class="text-center mb-4">{{ $t(`faq.categories.${category}.title`) }}</h2>
    <p class="text-center mb-2 subtitle">{{ $t(`faq.subcategory_header`) }}</p>
    <p class="text-center mb-4 help-text">{{ $t(`faq.subcategory_help_text`) }}</p>
    <b-row v-for="(s, id) in num_subsections" v-bind:key="id" class="subsections" @click="subsectionClicked(id)">
      <b-button block>
        {{ $t(`faq.categories.${category}.content[${id}].title`) }}
        <i class="fas fa-chevron-right"></i>
      </b-button>
    </b-row>
    <b-row>
      <b-button class="mt-4" variant="outline-primary" @click="backButtonClicked()">
        <i class="fas fa-chevron-left"></i>
        {{ $t(`faq.header`) }}
      </b-button>
    </b-row>
  </b-container>
</template>

<script>
import en_json from '../locales/en.json'
export default {
  name: 'faq-mid',
  data() {
    let category = this.$route.params.category
    return {
      category: category,
      num_subsections: en_json.faq.categories[category].content.length
    }
  },
  methods: {
    subsectionClicked(id) {
      this.$router.push(`/faq/${this.$route.params.category}/${id}`)
    },
    backButtonClicked() {
      this.$router.push(`/faq`)
    }
  }
}
</script>

<style lang="scss">
p.subtitle {
  font-size: 1.2rem;
  color: #aaa;
}

p.help-text {
  color: $teal;
}

#faq-mid {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
}

div.subsections {
  button {
    height: 6rem;
    border-top: $gray-500 1px solid;
  }

  &:last-child {
    border-bottom: $gray-500 1px solid;
  }
}
</style>
