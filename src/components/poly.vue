<template>
  <div class="viewer">
    <vc-viewer @ready="ready">
          <vc-layer-imagery>
      <vc-provider-imagery-openstreetmap></vc-provider-imagery-openstreetmap>
    </vc-layer-imagery>
      <vc-primitive :appearance="appearance">
        <vc-instance-geometry
          id="top"
          :geometry="geometry"
          :color="color"
          :attributes="attributes"
          :modelMatrix="modelMatrix1"
        ></vc-instance-geometry>
        <vc-instance-geometry
          id="bottom"
          :geometry="geometry"
          :color="color"
          :attributes="attributes"
          :modelMatrix="modelMatrix2"
        ></vc-instance-geometry>
      </vc-primitive>
      <vc-primitive :appearance="appearance2" :geometryInstances.sync="geometryInstances">
        <vc-instance-geometry>
          <vc-geometry-rectangle :rectangle="rectangle"></vc-geometry-rectangle>
        </vc-instance-geometry>
        <vc-instance-geometry :geometry.sync="geometry2">
          <vc-geometry-polygon :polygonHierarchy="polygonHierarchy" :height="height"></vc-geometry-polygon>
        </vc-instance-geometry>
      </vc-primitive>
    </vc-viewer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        appearance: {},
        geometry: {},
        color: {},
        attributes: {},
        modelMatrix1: {},
        modelMatrix2: {},
        appearance2: null,
        geometry2: null,
        geometryInstances: null,
        polygonHierarchy: [

          { lng: 74.181430019492, lat: 31.409429038774864 },
          { lng: 74.18143454580581, lat: 31.409746010585152 },
          { lng: 74.18128081629303, lat: 331.409746898993614 },
          { lng: 74.18126859508436, lat: 31.409744914389265 },
          { lng: 74.181430019492, lat: 31.409429038774864 }
        ],
        height: 200,
        rectangle: { west: 110.5, south: 29.5, east: 115.5, north: 34.5 }
      }
    },
    methods: {
      ready(cesiumInstance) {
        this.cesiumInstance = cesiumInstance
        const { Cesium } = this.cesiumInstance
        this.appearance = new Cesium.PerInstanceColorAppearance()
        this.attributes = {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        }
        this.geometry = Cesium.BoxGeometry.fromDimensions({
          vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
          dimensions: new Cesium.Cartesian3(1000000.0, 1000000.0, 500000.0)
        })

        this.modelMatrix1 = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(108, 40.03883)),
          new Cesium.Cartesian3(0.0, 0.0, 100000.0),
          new Cesium.Matrix4()
        )
        ;(this.modelMatrix2 = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(108, 40.03883)),
          new Cesium.Cartesian3(0.0, 0.0, 1500000.0),
          new Cesium.Matrix4()
        )),
          (this.appearance2 = new Cesium.MaterialAppearance({
            material: Cesium.Material.fromType('Checkerboard', {
              repeat: new Cesium.Cartesian2(20.0, 6.0)
            }),
            materialSupport: Cesium.MaterialAppearance.MaterialSupport.TEXTURED
          }))
      }
    }
  }
</script>