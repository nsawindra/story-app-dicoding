class NotFoundView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .not-found-container {
          text-align: center;
          padding: 5rem 1rem;
        }
        .not-found-container h2 {
          font-size: 5rem;
          margin: 0;
        }
        .not-found-container p {
          font-size: 1.5rem;
        }
      </style>
      <div class="not-found-container">
        <h2>404</h2>
        <p>Halaman tidak ditemukan</p>
        <a href="#/" class="button">Kembali ke Beranda</a>
      </div>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
