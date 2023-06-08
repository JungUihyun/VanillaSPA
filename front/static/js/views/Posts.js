import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  // params 값 전달받기
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>You're viewing the posts!</p>
    `;
  }
}