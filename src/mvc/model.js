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

    this.supportedFormat = ["jpg", "jpeg", "png", "webp", "bmp", "svg", "gif"]; // for selected, not to convert
    this.selectedFormat = ".webp";
  }
}

export default Model;
