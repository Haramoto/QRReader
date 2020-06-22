<template>
  <div class="qr-reader">
    <video id="js-video" class="reader-video" ref="video" autoplay playsinline></video>
    <div style="display:none">
      <canvas ref="canvas"></canvas>
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Info
        </v-card-title>

        <v-card-text style="font-size:120%">
          <a v-if="url" :href="msg">{{ msg }}</a>
          <div v-else>{{ msg }}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import jsQR from 'jsqr';
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

@Component({})
export default class HelloWorld extends Vue {
  @Ref()
  private video!: any;

  @Ref()
  private canvas!: any;

  private ctx: any;

  private dialog = false;

  private msg = '';

  private url = false;

  private async mounted() {
    this.ctx = this.canvas.getContext('2d');

    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { exact: 'environment' },
          frameRate: { ideal: 10, max: 15 },
        },
      });
      this.video.srcObject = stream;
      this.video.onloadedmetadata = (e: any) => {
        // ビデオのサイズ取得後にCanvasサイズをリサイズ
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.video.play();
        this.checkImage();
      };
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  private checkImage() {
    const code_width = this.canvas.width;
    const code_height = this.canvas.height;
    // QRコードのデコード領域
    const code_wh = Math.min(code_width, code_height);

    // 取得している動画をCanvasに描画
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    // Canvasからデータを取得
    const imageData = this.ctx.getImageData(0, 0, code_width, code_height);

    // jsQRに渡す
    const code = jsQR(imageData.data, code_width, code_height);

    // QRコードの読み取りに成功したらモーダル開く
    // 失敗したら再度実行
    if (code) {
      console.log(code);
      this.dialog = true;
      this.msg = code.data;
      this.url = /^https?:\/\/[\w!?/\+\-_~=;\.,*&@#$%\(\)\’\[\]]+/.test(this.msg);
    }
    setTimeout(() => {
      this.checkImage();
    }, 250);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reader {
  width: 100vw;
  height: 100%;
  position: relative;
}

.reader-video {
  background-color: #000;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
