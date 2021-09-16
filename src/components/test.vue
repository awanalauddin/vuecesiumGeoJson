<template>
  <div class="viewer">
    <vc-viewer @ready="ready">
      <vc-datasource-geojson
        @ready="subReady"
        :show="show"
        :options="options"
        ref="ds"
        @click="clicked"
        :entities="entities"
      ></vc-datasource-geojson>
    </vc-viewer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        options: {
          stroke: 'red'
        },
        entities: []
      }
    },
    methods: {
      ready(cesiumInstance) {
        const { Cesium, viewer } = cesiumInstance
        
        for (let i = 0; i < 100; i++) {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(74.181430019492+(i*0.10), 31.409429038774864+(i*0.10), 100),
            label: {
              text: i.toString(),
              pixelOffset: { x: 25, y: 20 }
            },
            point: {
              pixelSize: 8,
              outlineWidth: 2,
              color: 'red',
              outlineColor: 'yellow'
            }
          })
        }
      },
      subReady(cesiumInstance) {
        cesiumInstance.viewer.zoomTo(cesiumInstance.cesiumObject)
      },
      clicked(e) {
        console.log(e)
      }
    }
  }
</script>