import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Dashboard');
  }

  async getHtml() {
    return `
      <h1>Welcome!</h1>
      <p>This is Dashboard page.</p>
      <a href='/posts' data-link>
        View recent posts
      </a>
    `;
  };
}