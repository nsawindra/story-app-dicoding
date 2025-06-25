const RegisterPresenter = {
  init({ view, model }) {
    this._view = view;
    this._model = model;
  },

  async register(name, email, password) {
    try {
      this._view.showLoading();
      await this._model.register(name, email, password);
      this._view.onRegisterSuccess();
    } catch (error) {
      this._view.onRegisterFailure(error.message);
    }
  },
};

export default RegisterPresenter;