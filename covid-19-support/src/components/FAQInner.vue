<template>
  <b-container id="faq-inner">
    <h4 class="text-center mb-4">TODO title</h4>
    <!-- Bootstrap accordion -->
    <div role="tablist">
      <b-card no-body class="m-1 accordion-item" v-for="(qa, i) in content.questions" v-bind:key="i">
        <!-- Question -->
        <b-card-header header-tag="header" class="p-1 accordion-header" role="tab">
          <b-button block v-b-toggle="'accordion-' + i" variant="secondary" class="text-left">
            <i class="fas fa-plus show-when-closed mr-1"></i>
            <i class="fas fa-times show-when-open mr-1"></i>
            {{ qa.question }}
          </b-button>
        </b-card-header>
        <!-- Answer -->
        <b-collapse v-bind:id="'accordion-' + i" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <ul>
              <li v-for="(answer, j) in qa.answer" v-bind:key="j" v-html="answer"></li>
            </ul>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import en_json from '../locales/en.json'
export default {
  name: 'faq-inner',
  data() {
    let category = this.$route.params.category
    let id = this.$route.params.id
    return {
      content: en_json.faq.categories[category].content[id]
    }
  }
}
</script>

<style lang="scss">
#faq-inner {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
}

.accordion-header button {
  //
}

.collapsed > .show-when-open,
.not-collapsed > .show-when-closed {
  display: none;
}

button.not-collapsed {
  font-weight: bold;
}
</style>
