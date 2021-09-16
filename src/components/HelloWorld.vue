<template>
  <v-container px-0 pb-0 ma-0 fluid>
    <v-card tile elevation="0">
      <v-row no-gutters>
        <v-col cols="12" sm="7" class="mb-1">
          <v-card height="93vh" hover tile ml-n2 outlined>
              <l-map
                ref="map"
                :zoom="14"
                :center="[33.63904069996529, 72.98812038414918]"
                >

                <l-tile-layer v-if="baseMap == 'Dark'" :url="baseMaps.dark.url" />
                  <l-tile-layer v-if="baseMap == 'Grey'" :url="baseMaps.gray.url" />
                 <l-control position="topright">
                    <v-card max-width="190" outlined>
                    <v-expansion-panels v-model="panel" hover focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header ripple>
                            Basemaps
                            <template #actions>
                              <v-icon color="#2773A9"> $expand </v-icon>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-radio-group v-model="baseMap" :mandatory="true">
                              <v-radio
                                class="ma-0 pa-0"
                                v-for="map in ['Grey', 'Dark']"
                                :key="map"
                                :label="map"
                                :value="map"
                                color="#2773A9"
                                @change="abc()"
                              ></v-radio>
                            </v-radio-group>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    </v-card>
                    </l-control>
                    <l-control position="topleft" >
                      <v-btn class="primary" @click="calculate()">
Calculate
                      </v-btn>
                    </l-control>
              </l-map>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import * as turf from '@turf/turf';

export default {
data(){
  return{
           polyLayer:[],

  panel:0,

  baseMap: "Dark",
      url: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      baseMaps: {
        // street: {
        //   url: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        //   maxZoom: 20,
        //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
        // },
        // hybrid: {
        //   url: "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        //   maxZoom: 20,
        //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
        // },
        // satellite: {
        //   url: "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        //   maxZoom: 20,
        //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
        // },
        // terrain: {
        //   url: "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        //   maxZoom: 20,
        //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
        // },
        // traffic: {
        //   url: "https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
        //   maxZoom: 20,
        //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
        // },
       
        dark: {
          url:
            "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
          // maxZoom: 20,
        },
        gray: {
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          // maxZoom: 16,
        },
       
      },
        map:Object,
        points : turf.points([
    [ 72.98627183980652, 33.64580117838974],
    [72.98026369199768, 33.646872954872606 ],
    [72.99064920463867, 33.637726700007526 ],
    [73.00850198669926, 33.64372903935327]
]),

}

},
methods:{
  abc(){
    console.log(this.polyLayer, 'abc');
  },
calculate(){
  console.log('asf', this.polyLayer);
  var abc = this.polyLayer
  console.log(abc, 'abcccc');
  var polygn =   turf.polygon(this.polyLayer);
  // var poly = turf.bboxPolygon(this.polyLayer);
var area = turf.area(polygn);
console.log(area, 'areaaa');

// var ptsWithin = turf.pointsWithinPolygon(this.points, poly);
var poly = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
console.log(poly, 'polygon calculated turf');
console.log(polygn, 'polylayer calculated turf');
},

},
mounted(){
// Leaflet Map Object
this.$nextTick(() => {
  this.map = this.$refs.map.mapObject;

  // Tell leaflet that the map is exactly as big as the image
  // this.map.setMaxBounds(this.bounds);

  // The view model from Vue Data used in JS
  // This works, since wm refers to your view model.
 

  // Leaflet Draw
  // Add new FeatureGroup from leaflet for Draw objects on map
  // const featureGroup = new window.L.FeatureGroup().addTo(this.map);
 var editableLayers = new window.L.FeatureGroup();
 this.map.addLayer(editableLayers);

   // Create leaflet draw control menu
      const drawControl = new window.L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: {
            allowIntersection: true, // Restricts shapes to simple polygons
            drawError: {
              color: 'orange',
              timeout: 2000,
              message: '<strong>Nicht erlauben<strong>',
            },
            showArea: true,
            metric: true, //m2
            repeatMode: false,
            zIndexOffset: -10000,
            shapeOptions: {
              polylineID: true,
              customArrow: false,
              color: '#000000',
              weight: 5,
              lineCap: 'round',
              lineJoin: 'bevel',
              dashArray: '',
              opacity: 1,
            },
          },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: 'orange',
              timeout: 2000,
              message: '<strong>Nicht erlauben<strong>',
            },
             showArea: true,
            metric: true,//m2
            repeatMode: false,
            shapeOptions: {
              polylineID: false,
              color: '#000000',
              fillColor: '#2196F3',
              weight: 5,
              fillOpacity: 0.7,
              lineCap: 'round',
              lineJoin: 'bevel',
              dashArray: '',
              opacity: 1,
            },
          },
          rectangle: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: 'orange',
              timeout: 2000,
              message: '<strong>Nicht erlauben<strong>',
            },
            showArea: true,
            metric: true, //m2
            repeatMode: false,
            shapeOptions: {
              polylineID: false,
              color: '#000000',
              fillColor: '#2196F3',
              weight: 5,
              fillOpacity: 0.7,
              lineCap: 'round',
              lineJoin: 'bevel',
              dashArray: '',
              opacity: 1,
            },
          },
          circle: {
            allowIntersection: false,
            showArea: true,
            metric: true, //m2
            showRadius: true,
            repeatMode: false,
            shapeOptions: {
              polylineID: false,
              color: '#000000',
              fillColor: '#2196F3',
              weight: 5,
              fillOpacity: 0.7,
              lineCap: 'round',
              lineJoin: 'bevel',
              dashArray: '',
              opacity: 1,
            },
          },
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: editableLayers,
          remove: true,
          // edit: {
          //   // Set color and fill for edited element
          //   selectedPathOptions: {
          //     color: '#000',
          //     fillColor: '#000',
          //   },
          // },
        },
      })
      // Add all draw shapes on the map
      this.map.addControl(drawControl);
      var coords = [];
      this.map.on('draw:created', function(e) {
        console.log(e.layer._latlngs, 'layer props');
  var type = e.layerType,
    layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }

  editableLayers.addLayer(layer);

 for (var i =0; i < e.layer._latlngs[0].length; i++){
   
coords.push([parseFloat(e.layer._latlngs[0][i].lng.toFixed(5)), parseFloat(e.layer._latlngs[0][i].lat.toFixed(5))])


       
    }
    coords.push([parseFloat(e.layer._latlngs[0][0].lng.toFixed(5)), parseFloat(e.layer._latlngs[0][0].lat.toFixed(5))])
  
   



});

 console.log(coords, ' lat lng values');
    this.polyLayer = [coords]
    console.log(this.polyLayer, 'polygon layer coords');
 })
    
},
}
</script>

<style>

</style>