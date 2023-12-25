class Model {
  constructor() {
    this.img = {
      selected: "",
      name: "",
      format: "",
      blob: {
        url: "",
        width: 0,
        height: 0,
      },
    };

    this.selectedFormat = "";
  }
}

class View {
  constructor() {
    this.outputImageElement = document.querySelector(".output-img img");
    this.downloadButtonElement = document.getElementById("output-download-btn");
    this.fileDialogElement = document.getElementById("file-dialog");
    this.imageFormatSelectElement = document.getElementById("image-format-option");
    this.convertButtonElement = document.getElementById("convert-btn");
  }

  showOutput(source) {
    this.outputImageElement.src = source;
  }

  setDownloadButton(source, name, format) {
    this.downloadButtonElement.href = source;
    this.downloadButtonElement.download = name + format;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.fileDialogElement.addEventListener("change", (e) => {
      this.__inputFileHandler(e);
    });

    this.view.convertButtonElement.addEventListener("click", (e) => {
      this.__convertHandler();
    });

    this.view.imageFormatSelectElement.addEventListener("change", (e) => {
      this.__formatSelectHandler(e);
    });
  }

  __inputFileHandler(e) {
    const imgFileName = e.target.files[0].name.split(".");
    this.model.img.selected = e.target.files[0];
    this.model.img.name = imgFileName[0];
    this.model.img.format = imgFileName[imgFileName.length - 1];
  }

  __convertHandler() {
    if (this.model.img.blob.url !== "") {
      URL.revokeObjectURL(this.model.img.blob.url);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    this.model.img.blob.url = URL.createObjectURL(this.model.img.selected);
    const img = document.createElement("img");
    img.src = this.model.img.blob.url;
    img.onload = () => {
      this.view.showOutput(this.model.img.blob.url);

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);

      let outputURL;
      if (this.model.selectedFormat === ".webp") outputURL = canvas.toDataURL("image/webp");
      if (this.model.selectedFormat === ".jpg") outputURL = canvas.toDataURL("image/jpeg");
      if (this.model.selectedFormat === ".png") outputURL = canvas.toDataURL("image/png");
      if (this.model.selectedFormat === ".bmp") outputURL = canvas.toDataURL("image/bmp");

      this.view.setDownloadButton(outputURL, this.model.img.name, this.model.img.format);
    };
  }

  __formatSelectHandler(e) {
    this.model.selectedFormat = e.currentTarget.value;
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

function init() {
  controller.init();
}

document.addEventListener("DOMContentLoaded", init);
