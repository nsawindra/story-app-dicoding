const AddStoryPresenter = {
  init({ view, model }) {
    this._view = view;
    this._model = model;
  },

  async uploadStory({ photo, description, lat, lon }) {
    try {
      if (!photo) {
        throw new Error('Please select a photo to upload.');
      }
      
      this._view.showLoading();

      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('description', description);
      formData.append('lat', lat);
      formData.append('lon', lon);

      await this._model.addNewStory(formData);
      this._view.onUploadSuccess();
    } catch (error) {
      this._view.onUploadFailure(error.message);
    }
  },
};

// PENTING: Baris inilah yang memperbaiki error
export default AddStoryPresenter;