import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { LMap, LTileLayer, LMarker,LControl,  } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
// import * from 'leaflet';
/* eslint-disable no-unused-vars */
import LDraw from 'leaflet-draw';
/* eslint-enable no-unused-vars */
// Import leaflet draw css and icons for draw toolbar
import 'leaflet-draw/dist/leaflet.draw.css';

import VueCesium from 'vue-cesium'

Vue.use(VueCesium, {
  // cesiumPath is path of Cesium.js', for example:
  // local Cesium Build package:
  // cesiumPath: /static/Cesium/Cesium.js
  // Personal online Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // Personal online SuperMap Cesium Build package：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // Official Online Cesium Build package：
  cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
  // Cesium.Ion.defaultAccessToken
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwODAyN2RhMC00NDJhLTRlYTAtOTZhZi00MTA5YmY2NzNjOGIiLCJpZCI6NjY4NDksImlhdCI6MTYzMTI2ODYxNn0.8rktHAJjw8BFjLKc8OICV5ogvwbKzUZBUmY-ZTW9WJY'
})

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-control', LControl);
Vue.component('l-draw', LDraw);


Vue.config.productionTip = false

new Vue({
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
