<template>
  <!-- About Us -->
  <div id="about-us">
    <h3>{{ $t('about.about-us.header') }}</h3>
    <i18n path="about.about-us.p1.text" tag="p">
      <a
        href="https://www.google.com/maps/d/u/0/viewer?mid=1xfWfgbjULao-rlKJFfWT07hR-StV4Zx9&ll=37.46071505887045%2C-121.93017180578084&z=11"
        >{{ $t('about.about-us.p1.link') }}</a
      >
    </i18n>
    <i18n path="about.about-us.p2.text" tag="p">
      <a href="https://github.com/code-for-chapel-hill/NC-COVID-Support/">NC Covid Support</a>
    </i18n>
    <i18n path="about.about-us.p3.text" tag="p">
      <a href="https://github.com/dcl-covid-19/mega-map-dev">{{ $t('about.about-us.p3.link') }}</a>
    </i18n>
    <i18n path="about.front-page.p4.text" tag="p">
      <a href="https://datalab.stanford.edu/challenge-lab">{{ $t('about.front-page.p4.link0') }}</a>
      <a href="https://biglocalnews.org/">{{ $t('about.front-page.p4.link1') }}</a>
    </i18n>
    <i18n path="about.spthanks.p" tag="p">
      <a href="https://carto.com/">{{ $t('about.spthanks.link0') }}</a>
      <a href="http://mapbox.com/">{{ $t('about.spthanks.link1') }}</a>
    </i18n>
    <!-- Info sources -->
    <h3>{{ $t('about.info-sources.header') }}</h3>
    <p>{{ $t('about.about-us-disclaimer') }}</p>
    <p>{{ $t('about.info-sources.p1') }}</p>
    <ul>
      <li>
        <a
          href="https://usda-fns.hub.arcgis.com/datasets/USDA-FNS::snap-store-locations/data?geometry=41.839%2C-10.004%2C-171.911%2C74.154&page=5"
          >{{ $t('about.info-source.link1') }}</a
        >
      </li>
      <li>
        <a href="https://www.wicstorelocator.com/address_geo.php">{{ $t('about.info-source.link2') }}</a>
      </li>
      <li>
        <a href="https://www.shfb.org/">{{ $t('about.info-source.link3') }}</a>
      </li>
      <li>
        <a href="http://med.stanford.edu/pedsadvocacy.html">{{ $t('about.info-source.link4') }}</a>
      </li>
    </ul>
    <p>{{ $t('about.info-sources.p2') }}</p>
    <!-- Contact Us -->
    <h3>{{ $t('about.contact-us.header') }}</h3>
    <i18n path="about.contact-us.p1.text" tag="p"> <a href="mailto:hi@bayareacommunity.org">hi@bayareacommunity.org</a>. </i18n>
    <!-- Disclaimer -->
    <h3>{{ $t('about.disclaimer.header') }}</h3>
    <p>
      Bay Area Community Resources (“BACR” or “we”) is a volunteer-driven project. We are working to keep the information on this site as
      up-to-date and accurate as possible. Due to the uncertainty surrounding the rapid spread of COVID-19, information is changing
      frequently. Please make sure to contact the resource directly for the latest updates.
    </p>
    <p>
      BACR does not provide any of the services listed on this site, nor are we affiliated with any of the organizations listed. BACR makes
      no claims, promises or guarantees about the accuracy, completeness, or adequacy of the contents of this website and expressly
      disclaims liability for errors and omissions in the contents of this website. No warranty of any kind, implied, expressed or statutory
      is given with respect to the contents of this website or its hyperlinks to other Internet resources. References in this application or
      website to any specific services or the use of any trade, entity or corporation name is for the information and convenience of the
      public, and does not constitute endorsement or recommendation.
    </p>
    <p>
      BACR shall assume no liability for any errors, omissions, or inaccuracies in the information provided, regardless of their cause, or
      for any decisions made or actions taken or not taken by the user of this application or website (“you”) in reliance upon any
      information or data furnished hereunder. By using this application or website, you agree to indemnify and hold harmless BACR and its
      volunteers, representatives, and agents from any claims or demands arising out of or in connection with your use of this application
      or website.
    </p>
    <p>
      BACR may modify this disclaimer at any time without notice to you by posting revised disclaimer on this application or website. The
      use of this information indicates your unconditional acceptance of the above disclaimer.
    </p>
  </div>
</template>
<script>
export default {
  name: 'about-us'
}
</script>
<style lang="scss">
#about-us {
  max-width: 1024px;
  padding: 24px 24px 100px;
  margin: 0 auto;
}
</style>
