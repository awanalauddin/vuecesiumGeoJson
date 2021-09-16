<template>
  <v-container>
      <v-row>
          <v-col >

<v-card>
    <v-btn class="primary" @click="sh = !sh">
        Show
    </v-btn>

<!-- 'data:image/pdf;base64,'+handyAttachments[0].file.base64 -->

    <v-img v-if="handyAttachments.length >0" v-bind:src="'data:image/jpeg;base64,'+handyAttachments[0].file.base64" />
        <!-- <a v-if="handyAttachments.length >0" @click="showpdf">download</a> -->
    </v-card>
          </v-col>
      </v-row>
      
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition" v-model="sh">

<v-card>
    <v-toolbar>
        <v-spacer>
            <v-btn @click="sh = show()">
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-spacer>
    </v-toolbar>
        <handy-uploader
    :documentAttachment.sync="handyAttachments"
    :fileUploaderType= "'simple'"
    :maxFileSize= "10240"
    :imageCompressor= "true"
    :imageCompressLevel= "0.8"
    :maxFileCount= "10"
    :badgeCounter= "true"
    :thumb= "false"
    :changeFileName="true"
    :addFileDescription="true"
    :addFileTag="true"
    :tags= "['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']"
>
</handy-uploader>
</v-card>

</v-dialog>
<vc-viewer class="viewer" :animation="animation" :timeline="timeline" :camera.sync="camera" @ready="ready">
    <vc-layer-imagery>
      <vc-provider-imagery-openstreetmap></vc-provider-imagery-openstreetmap>
    </vc-layer-imagery>
  </vc-viewer>
  </v-container>
</template>

<script>
 import handyUploader from 'handy-uploader/src/components/handyUploader';
export default {
      components: {
            handyUploader,
        },
         data: () => ({
            handyAttachments: [],
            sh:false,
             animation: true,
        timeline: true,
        camera: {
          position: {
           lng: 74.181430019492, lat: 31.409429038774864,
            height: 100000
          },
          heading: 360,
          pitch: -90,
          roll: 0,}
        }),


        methods:{
ready(cesiumInstance) {
        const { Cesium, viewer } = cesiumInstance
        viewer.entities.add({
          id: 'Welcome to Chengdu',
          position: Cesium.Cartesian3.fromDegrees(74.181430019492, 31.409429038774864, 100),
          billboard: new Cesium.BillboardGraphics({
            image: 'https://zouyaoji.top/vue-cesium/favicon.png',
            scale: 0.1
          }),
          label: new Cesium.LabelGraphics({
            text: 'Hello Cesium',
            fillColor: Cesium.Color.GOLD,
            font: '24px sans-serif',
            horizontalOrigin: 1,
            outlineColor: new Cesium.Color(0, 0, 0, 1),
            outlineWidth: 2,
            pixelOffset: new Cesium.Cartesian2(17, -5),
            style: Cesium.LabelStyle.FILL
          })
        })},



showpdf(){
let pdfWindow = window.open("")
pdfWindow.document.write(
    "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
    encodeURI(this.handyAttachments[0].file.base64) + "'></iframe>"
)},
show(){
console.log(this.handyAttachments);
this.sh = !this.sh

             }
        },


}
</script>

<style>

</style>