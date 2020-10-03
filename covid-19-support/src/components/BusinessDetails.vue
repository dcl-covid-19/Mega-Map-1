<template>
  <span>
    <b-list-group class="list-group-flush business-details">
      <div>
        <p>
          <icon-list-item v-if="business.discount_medical == 1" icon="fas fa-user-md" :title="$tc('label.discount_medical', 1)" />
          <icon-list-item v-if="business.meal_student == 1" icon="fas fa-school" :title="$tc('label.meal_student', 1)" />
          <icon-list-item v-if="business.free_groceries == 1" icon="fas fa-shopping-basket" :title="$tc('label.free_groceries', 1)" />
          <icon-list-item v-if="business.curbside_pickup == 1" icon="fas fa-car" :title="$tc('label.curbside_pickup', 1)" />
          <icon-list-item v-if="business.drive_thru == 1" icon="fas fa-car-side" :title="$t('label.drive_thru')" />
          <icon-list-item v-if="business.pay_phone == 1" icon="fas fa-mouse" :title="$t('label.pay_phone')" />
          <icon-list-item v-if="business.delivery == 1" icon="fas fa-shipping-fast" :title="$t('label.delivery')" />
          <icon-list-item
            v-if="!!business.web_link"
            icon="fas fa-globe"
            :title="getDomain(getTranslation(business, 'web_link'))"
            :link="getTranslation(business, 'web_link')"
          />
          <icon-list-item
            v-if="!!business.email"
            icon="fas fa-envelope"
            :title="getDomain(business.email)"
            :link="'mailto:' + business.email"
          />
        </p>
        <p>
          <opening-hours :business="business" :title="$t('label.openinghours')"></opening-hours>
          <opening-hours v-if="business.special_hours" :business="business" :title="$t('label.seniorhours')" :senior="true"></opening-hours>
          <template v-if="!!business.notes && !legalResources && !mentalResources && !medicalResources">
            <p>
              <b>{{ $t('label.notes') }}:</b> {{ getTranslation(business, 'notes') }}
            </p>
          </template>
        </p>

        <p class="updated">{{ $t('label.last_updated') }}: {{ business.last_update }}</p>
      </div>
    </b-list-group>
  </span>
</template>

<script>
import OpeningHours from '@/components/OpeningHours.vue'
import IconListItem from '@/components/IconListItem.vue'
import { businessIcon } from '@/utilities'
export default {
  name: 'BusinessDetails',
  components: {
    OpeningHours,
    IconListItem
  },
  data() {
    return {}
  },
  props: {
    infotype: { type: String },
    icon: { type: String },
    business: Object,
    legalResources: Boolean,
    medicalResources: Boolean,
    mentalResources: Boolean
  },
  methods: {
    getDomain: function (url) {
      var urlParts = url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)
      return urlParts[0]
    },
    getTranslation(business, field) {
      if (this.$i18n.locale != 'en' && business[field + '_' + this.$i18n.locale]) {
        return business[field + '_' + this.$i18n.locale]
      }
      return business[field]
    },
    businessIcon: businessIcon
  },
  computed: {
    businessGoogleMapUrl() {
      var url =
        'https://www.google.com/maps/search/?api=1&query=' +
        (this.business.provider_addloc ? encodeURI(this.business.provider_addloc) : encodeURI(this.business.provider_name)) +
        '+' +
        encodeURI(this.business.address) +
        '+' +
        encodeURI(this.business.city) +
        '+' +
        encodeURI(this.business.state) +
        '+' +
        encodeURI(this.business.zip)

      return url.replace(/%20/g, '+').toLowerCase()
    }
  }
}
</script>

<style scoped lang="scss">
.business-details {
  background-color: transparent;
}

.updated {
  color: #aaa;
}
</style>
