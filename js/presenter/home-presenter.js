const HomePresenter = {
  init({ view, model }) {
    this._view = view;
    this._model = model;
    // this.fetchStories(); <-- BARIS INI KITA HAPUS. Biarkan View yang memanggilnya.
  },

  async fetchStories() {
    try {
      this._view.showLoading();
      const stories = await this._model.getAllStories();
      this._view.displayStories(stories);
    } catch (error) {
      this._view.displayError(error.message);
    }
  },
};

export default HomePresenter;