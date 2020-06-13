<template>
  <v-app>
    <QRReader></QRReader>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import QRReader from './components/QRReader.vue';

export default Vue.extend({
  name: 'App',

  components: {
    QRReader,
  },

  data: () => ({
    //
  }),
});
</script>
