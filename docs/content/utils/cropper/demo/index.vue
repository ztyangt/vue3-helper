<template>
  <div class="cropper-demo">
    <div class="demo-header">
      <h2>图片裁剪器演示</h2>
      <div class="demo-controls">
        <button @click="setAspectRatio(1)" :class="{ active: currentAspectRatio === 1 }">1:1</button>
        <button @click="setAspectRatio(16 / 9)" :class="{ active: currentAspectRatio === 16 / 9 }">16:9</button>
        <button @click="setAspectRatio(4 / 3)" :class="{ active: currentAspectRatio === 4 / 3 }">4:3</button>
        <button @click="setAspectRatio()" :class="{ active: currentAspectRatio === null }">自由</button>
        <button @click="resetCropper">重置</button>
      </div>
    </div>

    <div class="demo-content">
      <div class="cropper-section">
        <div ref="cropperContainer" class="cropper-container"></div>
        <div class="cropper-actions">
          <button @click="cropImage">裁剪图片</button>
        </div>
      </div>

      <div class="preview-section" v-if="croppedImage">
        <h3>裁剪结果</h3>
        <div class="preview-container">
          <img :src="croppedImage" alt="裁剪结果" />
        </div>
        <button @click="downloadImage" class="download-btn">下载图片</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Cropper } from "../../../../../src/utils/cropper";

let cropper: Cropper;
const cropperContainer = ref<HTMLDivElement>();
const croppedImage = ref<string>();
const currentAspectRatio = ref<number>(16 / 9);

onMounted(() => {
  if (!cropperContainer.value) {
    return;
  }

  cropper = new Cropper(cropperContainer.value, {
    aspectRatio: currentAspectRatio.value,
    cropWidth: 400,
    cropHeight: 225,
  });

  cropper.setImage("https://cn.bing.com/th?id=OHR.MinnewankaLake_ZH-CN3020982568_1920x1080.jpg");

  // 监听预览事件
  cropper.on("preview", (previewUrl) => {
    console.log("预览URL:", previewUrl);
  });
});

onUnmounted(() => {
  if (cropper) {
    cropper.destroy();
  }
});

const setAspectRatio = (aspectRatio?: number) => {
  currentAspectRatio.value = aspectRatio || 1;
  if (cropper) {
    // 重新创建cropper实例以更改宽高比
    cropper.destroy();

    if (cropperContainer.value) {
      cropper = new Cropper(cropperContainer.value, {
        aspectRatio,
        cropWidth: 400,
        cropHeight: aspectRatio ? 400 / aspectRatio : 300,
      });

      cropper.setImage("https://cn.bing.com/th?id=OHR.MinnewankaLake_ZH-CN3020982568_1920x1080.jpg");
    }
  }
};

const cropImage = () => {
  if (cropper) {
    const result = cropper.crop({
      format: "jpeg",
      quality: 0.9,
      outputWidth: 800,
      outputHeight: currentAspectRatio.value ? 800 / currentAspectRatio.value : 600,
    });
    croppedImage.value = result;
  }
};

const resetCropper = () => {
  if (cropper) {
    cropper.destroy();

    if (cropperContainer.value) {
      cropper = new Cropper(cropperContainer.value, {
        aspectRatio: currentAspectRatio.value,
        cropWidth: 400,
        cropHeight: currentAspectRatio.value ? 400 / currentAspectRatio.value : 300,
      });

      cropper.setImage("https://cn.bing.com/th?id=OHR.MinnewankaLake_ZH-CN3020982568_1920x1080.jpg");
    }
  }
  croppedImage.value = "";
};

const downloadImage = () => {
  if (croppedImage.value) {
    const link = document.createElement("a");
    link.href = croppedImage.value;
    link.download = "cropped-image.jpg";
    link.click();
  }
};
</script>

<style lang="scss" scoped>
.cropper-demo {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .demo-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .demo-controls {
      display: flex;
      justify-content: center;
      gap: 10px;

      button {
        padding: 8px 16px;
        border: 1px solid #39f;
        background-color: #fff;
        color: #39f;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: #e6f2ff;
        }

        &.active {
          background-color: #39f;
          color: #fff;
        }
      }
    }
  }

  .demo-content {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  .cropper-section {
    text-align: center;
    width: 100%;

    .cropper-container {
      width: 100%;
      max-width: 600px;
      height: 400px;
      margin: 0 auto;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }

    .cropper-actions {
      margin-top: 20px;

      button {
        padding: 10px 24px;
        border: none;
        background-color: #39f;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #2c89e6;
        }
      }
    }
  }

  .preview-section {
    text-align: center;

    h3 {
      margin-bottom: 20px;
      color: #333;
    }

    .preview-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .download-btn {
      margin-top: 20px;
      padding: 10px 24px;
      border: none;
      background-color: #4caf50;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style>
