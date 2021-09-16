<template>
  <v-container>
      <v-btn @click="show">
          ShowHandy
      </v-btn>

       <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"  v-model="sh">

<v-card>
    <v-toolbar>
        <v-spacer>
            <v-btn @click="sh = close()">
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
  </v-container>
</template>
<script>
 import handyUploader from 'handy-uploader/src/components/handyUploader';
export default {
      components: {
            handyUploader,
        },
         data: () => ({
sh:false,
handyAttachments:[],

         }),
         methods:{
             show(){
this.sh = ! this.sh
             },
             close(){
                 this.sh = false
                 console.log(this.handyAttachments[0]);
             }
         }
}
</script>

<style>

</style>