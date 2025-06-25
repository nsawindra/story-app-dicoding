// PRESENTER: Tidak ada import apapun di sini, sesuai permintaan reviewer
const LoginPresenter = {
  // Inisialisasi dengan view dan model
  init({ view, model }) {
    this._view = view;
    this._model = model;
  },

  // Fungsi yang dipanggil oleh view saat form disubmit
  async login(email, password) {
    try {
      this._view.showLoading();
      await this._model.login(email, password);
      this._view.onLoginSuccess();
    } catch (error) {
      this._view.onLoginFailure(error.message);
    }
  },
};

export default LoginPresenter;