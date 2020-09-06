<template>
  <b-container id="faq-inner">
    <h4 class="text-center mb-4">
      {{ $t(`faq.categories.${category}.content[${id}].title`) }}
    </h4>
    <!-- Bootstrap accordion -->
    <div role="tablist">
      <b-card no-body class="m-1 accordion-item" v-for="(q, q_id) in num_questions" v-bind:key="q_id">
        <!-- Question -->
        <b-card-header header-tag="header" class="p-1 accordion-header" role="tab">
          <b-button block v-b-toggle="'accordion-' + q_id" variant="secondary" class="text-left">
            <i class="fas fa-plus show-when-closed mr-1"></i>
            <i class="fas fa-times show-when-open mr-1"></i>
            <!-- q_id starts counting from 1 (but our indices start from 0) -->
            {{ $t(`faq.categories.${category}.content[${id}].questions[${q_id}].question`) }}
          </b-button>
        </b-card-header>
        <!-- Answer -->
        <b-collapse v-bind:id="'accordion-' + q_id" v-bind:visible="isQuestionExpanded(q_id)" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <ul>
              <li
                v-for="(a, a_id) in num_answers_arr[q_id]"
                v-bind:key="a_id"
                v-html="$t(`faq.categories.${category}.content[${id}].questions[${q_id}].answer[${a_id}]`)"
              ></li>
              <!-- use <i18n> with path -->
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
    this.setPageData(this.$route)
    return {
      category: this.category,
      id: this.id,
      num_questions: this.num_questions,
      num_answers_arr: this.num_answers_arr
    }
  },
  methods: {
    isQuestionExpanded(q_id) {
      return this.$route.params.q_id != null && this.$route.params.q_id == q_id
    },
    setPageData(route) {
      this.category = route.params.category
      this.id = route.params.id
      this.num_questions = en_json.faq.categories[this.category].content[this.id].questions.length
      this.num_answers_arr = en_json.faq.categories[this.category].content[this.id].questions.map((obj) => obj.answer.length)
    }
  },
  // Catch route parameter changes and rerender (ex. /faq/subsection/1 => /faq/subsection/0)
  beforeRouteUpdate(to, from, next) {
    this.setPageData(to)
    next()
  },
  // Catch route changes and rerender (ex. /faq/subsection/1/0 => /faq/subsection/0)
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setPageData(to)
    })
  }
}
</script>

<style lang="scss">
#faq-inner {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
}

.collapsed > .show-when-open,
.not-collapsed > .show-when-closed {
  display: none;
}

button.not-collapsed {
  font-weight: bold;
}
</style>
