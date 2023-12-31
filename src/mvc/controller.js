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

    this.view.dropFileElement.addEventListener("dragenter", (e) => {
      e.preventDefault();
      this.view.highlightDrop(true);
    });

    this.view.dropFileElement.addEventListener("dragleave", (e) => {
      e.preventDefault();
      this.view.highlightDrop(false);
    });

    this.view.dropFileElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.view.dropFileElement.addEventListener("drop", (e) => {
      e.preventDefault();
      this.view.highlightDrop(false);

      const imgFileName = e.dataTransfer.files[0].name.split(".");

      if (!this.checkSupport(imgFileName[imgFileName.length - 1])) {
        return;
      }

      this.model.img.selected = e.dataTransfer.files[0];
      this.model.img.name = imgFileName[0];
      this.model.img.format = imgFileName[imgFileName.length - 1];
      this.view.showSelectedFileName(e.dataTransfer.files[0].name, true);
      this.view.enableConvertButton(true);
    });
  }

  checkSupport(format) {
    if (!this.model.supportedFormat.includes(format)) {
      this.view.showFileNotSupportedError();
      return false;
    }

    return true;
  }

  __inputFileHandler(e) {
    if (e.target.files[0]) {
      const imgFileName = e.target.files[0].name.split(".");
      if (!this.checkSupport(imgFileName[imgFileName.length - 1])) {
        return;
      }

      this.model.img.selected = e.target.files[0];
      this.model.img.name = imgFileName[0];
      this.model.img.format = imgFileName[imgFileName.length - 1];

      this.view.showSelectedFileName(e.target.files[0].name, true);
      this.view.enableConvertButton(true);
    }
  }

  __convertHandler() {
    this.destroyCreatedBlob();

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

      this.view.setDownloadButton(outputURL, this.model.img.name, this.model.selectedFormat);

      this.view.enableDownloadButton(true);
    };
  }

  __formatSelectHandler(e) {
    this.model.selectedFormat = e.currentTarget.value;
    this.view.enableDownloadButton(false);

    this.view.resetOutput();
    this.destroyCreatedBlob();
  }

  destroyCreatedBlob() {
    if (this.model.img.blob.url !== "") {
      URL.revokeObjectURL(this.model.img.blob.url);
    }
  }
}

export default Controller;
