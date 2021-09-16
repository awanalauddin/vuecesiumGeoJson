<template>
  <div class="viewer">
    <vc-viewer @ready="ready">
        <vc-layer-imagery>
      <vc-provider-imagery-openstreetmap></vc-provider-imagery-openstreetmap>
    </vc-layer-imagery>
      <vc-datasource-geojson
      data="polygon.json"
        @ready="subReady"
        :show="show"
        :options="options"
        ref="ds"
        @click="clicked"
        
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
          // clampToGround:true,
          stroke: 'red',
          
          // extrudedHeight : 25,
        },
        entities: []
      }
    },
    methods: {
      ready() {
        for (let i = 0; i < 100; i++) {
          this.entities.push({
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
        console.log(cesiumInstance.cesiumObject.entities.values[0].polygon, 'entities');
        cesiumInstance.viewer.zoomTo(cesiumInstance.cesiumObject)

      },
      clicked(e) {
        console.log(e)
      }
    }
  }
</script>