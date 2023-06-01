export default class {
  // params 값 전달받기
  constructor(params) {
    this.params = params;
    console.log(this.params);
  }

  // 페이지 제목
  setTitle(title) {
    document.title = title;
  }

  // 뿌려질 HTML
  async getHtml() {
    return "";
  }
}