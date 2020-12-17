<template>
  <div id="edit-form">
    <p v-if="show">
      {{ $t('edit.intro') }}
    </p>
    <p v-else>{{ $t('edit.thanks') }}</p>
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <!-- Location -->
      <b-form-group id="input-group-1" label="Location:" label-for="input-1">
        <div class="row mb-2">
          <div class="col">
            <!-- name -->
            <b-form-text class="mb-1">{{ $t('edit.provider_name') }}:</b-form-text>
            <b-form-input id="input-1-1" v-model="form.provider_name"></b-form-input>
          </div>
          <div class="col">
            <!-- additional location details -->
            <template v-if="!!form.provider_addloc">
              <b-form-text class="mb-1">{{ $t('edit.location_name') }}:</b-form-text>
              <b-form-input id="input-1-2" v-model="form.provider_addloc"></b-form-input>
            </template>
          </div>
        </div>
        <!-- address -->
        <template v-if="!!form.address">
          <b-form-text class="mb-1">{{ $t('label.address') }}:</b-form-text>
          <b-form-input id="input-1-3" v-model="form.address"></b-form-input>
          <b-form-input v-if="!!form.city" id="input-1-3" v-model="form.city"></b-form-input>
        </template>
      </b-form-group>
      <!-- Contact -->
      <b-form-group id="input-group-2" label="Contact:" label-for="input-2">
        <div class="row mb-2">
          <div class="col">
            <!-- phone number -->
            <template>
              <b-form-text class="mb-1">{{ $t('label.phone') }}:</b-form-text>
              <b-form-input id="input-2-1" v-model="form.contact"></b-form-input>
            </template>
          </div>
          <div class="col">
            <!-- email -->
            <template>
              <b-form-text class="mb-1">{{ $t('label.email') }}:</b-form-text>
              <b-form-input id="input-2-2" v-model="form.email"></b-form-input>
            </template>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <!-- website -->
            <template>
              <b-form-text class="mb-1">{{ $t('edit.website') }}:</b-form-text>
              <b-form-input id="input-2-3" v-model="form.web_link"></b-form-input>
            </template>
          </div>
        </div>
      </b-form-group>
      <!-- Opening hours -->
      <b-form-group id="input-group-3" :label="$t('edit.opening_hours')" label-for="input-3-1">
        <div v-for="(d, index) in dayFilters" :key="index" class="mb-2">
          <b-form-text class="mb-1">{{ $t(`dayofweek.${weekdayHours[index].day}`) }}:</b-form-text>
          <b-form-input :id="'input-3-1-' + index" v-model="form[d]"></b-form-input>
        </div>
      </b-form-group>
      <!-- Senior hours -->
      <b-form-group id="input-group-4" :label="$t('edit.senior_hours')" label-for="input-4-1" v-if="form.special_hours == 1">
        <div v-for="(d, index) in seniorDayFilters" :key="index">
          <b-form-text class="mb-1">{{ $t(`dayofweek.${weekdayHours[index].day}`) }}:</b-form-text>
          <b-form-input :id="'input-4-1-' + index" v-model="form[d]"></b-form-input>
        </div>
      </b-form-group>
      <!-- Additional information -->
      <b-form-group id="input-group-5" :label="$t('edit.additional_info')" label-for="input-5-1">
        <b-form-text class="mb-1">{{ $t('edit.additional_info_text') }}</b-form-text>
        <b-form-textarea id="input-5-1" v-model="form.other" :placeholder="$t('edit.additional_info_placeholder')"></b-form-textarea>
      </b-form-group>
      <b-button type="reset" variant="danger">{{ $t('label.reset') }}</b-button>
      <b-button type="submit" variant="primary" class="float-right">{{ $t('label.submit') }}</b-button>
      <b-form-invalid-feedback v-if="submitted" :state="edited">{{ $t('edit.no_edit') }}</b-form-invalid-feedback>
    </b-form>
  </div>
</template>

<script>
import { dayFilters, weekdayHours, seniorDayFilters } from '@/resources/filters.js'
export default {
  name: 'EditForm',
  props: {
    location: Object
  },
  data() {
    return {
      form: {},
      dayFilters: {},
      weekdayHours: {},
      seniorDayFilters: {},
      show: true,
      edited: false,
      submitted: false
    }
  },
  created() {
    this.dayFilters = dayFilters
    this.weekdayHours = weekdayHours
    this.seniorDayFilters = seniorDayFilters
    // Prefill form with current values
    this.form = { ...this.location }
    this.formatHour()
    this.form.other = ''
  },
  methods: {
    formatHour() {
      dayFilters.forEach((d) => {
        this.form[d] = this.form[d] == '0' ? 'Closed' : this.form[d]
      })
      seniorDayFilters.forEach((d) => {
        this.form[d] = this.form[d] == '0' ? 'Closed' : this.form[d]
      })
    },
    async postForm(arr) {
      const urlbase = 'https://docs.google.com/forms/d/e/1FAIpQLSeV-PdW2XC4XWt78TfdmE8xcJ2JXga1Xr5mRKe0D8JPbp_NTA/formResponse'

      const form_entries = [
        'entry.1303167683',
        'entry.88165322',
        'entry.877956914',
        'entry.605324063',
        'entry.412042501',
        'entry.2078745335',
        'entry.1603482356',
        'entry.1495612279',
        'entry.216349566',
        'entry.1000522544',
        'entry.2046646524',
        'entry.1270024710',
        'entry.295717420',
        'entry.783076040',
        'entry.1241001602',
        'entry.1889172928',
        'entry.1995637968',
        'entry.1327042286',
        'entry.475737574',
        'entry.247372578',
        'entry.976125072',
        'entry.1761299050',
        'entry.2143387292',
        'entry.1640048744',
        'entry.456294914',
        'entry.1135130355',
        'entry.1603671834',
        'entry.1231907808',
        'entry.1996895285',
        'entry.2096169027',
        'entry.1581595588',
        'entry.896282023',
        'entry.1284470325',
        'entry.1091154180',
        'entry.156161214',
        'entry.1030028945',
        'entry.1675400185',
        'entry.573991945',
        'entry.6555295',
        'entry.250439081',
        'entry.1685005488',
        'entry.1086955615',
        'entry.2041034445',
        'entry.1988794704'
      ]

      const query = form_entries.reduce((u, e, i) => {
        return u + e + '=' + encodeURI(arr[i]) + '&'
      }, '?')
      // POST to google form
      try {
        await fetch(urlbase + query.slice(0, -1), {
          method: 'post',
          mode: 'no-cors'
        })
      } catch (e) {
        alert(this.$t('edit.submission_error'))
      }
    },
    onSubmit(evt) {
      evt.preventDefault()
      const col = ['provider_name', 'provider_addloc', 'address', 'city', 'contact', 'web_link', 'email']
      const days = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat', 'sp_sun', 'sp_mon', 'sp_tues', 'sp_wed', 'sp_thr', 'sp_fri', 'sp_sat']
      let resp = [this.location['cartodb_id']]
      col.forEach((c) => {
        resp.push(this.location[c])
        if (this.location[c] == this.form[c]) {
          resp.push('')
        } else {
          this.edited = true
          resp.push(this.form[c])
        }
      })
      days.forEach((c) => {
        resp.push(this.location[c])
        if ((this.location[c] == '0' && this.form[c] == 'Closed') || this.location[c] == this.form[c]) {
          resp.push('')
        } else {
          this.edited = true
          resp.push(this.form[c])
        }
      })
      // Other
      resp.push(this.form['other'])
      if (this.form['other'] !== '') {
        this.edited = true
      }
      // Submit if something was edited
      if (this.edited) {
        this.show = false
        this.postForm(resp)
        this.$emit('close-edit-form')
      }
      this.submitted = true
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.form = { ...this.location }
      this.formatHour()
      this.form.other = ''
      this.submitted = false
    }
  }
}
</script>
