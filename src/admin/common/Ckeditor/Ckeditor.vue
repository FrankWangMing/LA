<template>
  <div class="goods-editor">
    <!-- 工具栏容器 -->
    <div id="toolbar-container"></div>

    <!-- 编辑器容器 -->
    <div id="editor">
      <!-- <p>This is the initial editor content.</p> -->
    </div>
  </div>
  <!-- <ckeditor
    id="ckeditor"
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    @ready="onReady"
  /> -->
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";

// import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
// import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
// import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default {
  data() {
    return {
      editorData: "",
      editor: ClassicEditor,
      editorConfig: {
        plugin: [
          // EssentialsPlugin,
          // BoldPlugin,
          // ItalicPlugin,
          // LinkPlugin,
          // ParagraphPlugin,
        ],
        toolbar: [
          "bold",
          "italic",
          "blockQuote",
          "bulletedList",
          "numberedList",
          "link",
          "imageUpload",
          "undo",
          "redo",
        ],
      },
    };
  },
  mounted() {
    this.initCKEditor();
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    initCKEditor() {
      class UploadAdapter {
        constructor(loader) {
          console.log(loader);
          this.loader = loader;
        }
        upload() {
          //重置上传路径
          return new Promise((resolve) => {
            var fileName = "goods" + this.loader.file.lastModified;
            console.log(fileName);
            let client;
            client()
              .put(fileName, this.loader.file)
              .then((result) => {
                console.log(result);
                resolve({
                  default: result.url,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        abort() {}
      }
      //初始化编辑器
      ClassicEditor.create(document.querySelector("#editor"), {
        removePlugins: ["MediaEmbed"], //除去视频按钮
        language: "zh-cn", // 中文
        ckfinder: {
          uploaded: 1,
          url: "https://test-7gt6pjtm08c62d22.service.tcloudbase.com/uploadImg",
          // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
        },
      })
        .then((editor) => {
          const toolbarContainer = document.querySelector("#toolbar-container");
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          // 加载了适配器
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new UploadAdapter(loader);
          };
          this.editor = editor; // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
</style>