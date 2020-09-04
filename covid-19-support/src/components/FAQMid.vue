<template>
  <b-container id="faq-mid">
    <h4 class="text-center mb-4">What best describes your situation?</h4>
    <b-row v-for="(subsection, i) in content" v-bind:key="i" class="subsections" @click="subsectionClicked(i)">
      <b-button block>
        {{ subsection.title }}
        <i class="fas fa-chevron-right"></i>
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
      content: en_json.faq.categories[category].content
    }
  },
  methods: {
    subsectionClicked(id) {
      this.$router.push(`/faq/${this.$route.params.category}/${id}`)
    }
  }
}
</script>

<style lang="scss">
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
