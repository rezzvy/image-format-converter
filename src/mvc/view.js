class View {
  constructor() {
    this.outputImageElement = document.querySelector(".output-img img");
    this.downloadButtonElement = document.getElementById("output-download-btn");
    this.fileDialogElement = document.getElementById("file-dialog");
    this.imageFormatSelectElement = document.getElementById("image-format-option");
    this.convertButtonElement = document.getElementById("convert-btn");
    this.fileNameInformationElement = document.querySelector(".file-selected-information");
    this.errorNotification = document.querySelector(".error");

    this.dropFileElement = document.querySelector(".input-file-area");
  }

  resetOutput() {
    this.outputImageElement.src = "#";
  }

  showOutput(source) {
    this.outputImageElement.src = source;
  }

  setDownloadButton(source, name, format) {
    this.downloadButtonElement.href = source;
    this.downloadButtonElement.download = name + format;
  }

  highlightDrop(boolean) {
    boolean ? this.dropFileElement.classList.add("drop") : this.dropFileElement.classList.remove("drop");
  }

  showFileNotSupportedError() {
    this.errorNotification.classList.remove("none");

    setTimeout(() => {
      this.errorNotification.classList.add("none");
    }, 10000);
  }

  showSelectedFileName(fileName, boolean) {
    if (boolean) {
      this.fileNameInformationElement.classList.remove("none");
    } else {
      this.fileNameInformationElement.classList.add("none");
    }

    this.fileNameInformationElement.textContent = "File name: " + fileName;
  }

  enableConvertButton(boolean) {
    boolean ? this.convertButtonElement.classList.remove("disable") : this.convertButtonElement.classList.add("disable");
  }

  enableDownloadButton(boolean) {
    boolean ? this.downloadButtonElement.classList.remove("disable") : this.downloadButtonElement.classList.add("disable");
  }
}

export default View;
