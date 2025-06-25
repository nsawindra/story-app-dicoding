import FavoriteStoryIdb from '../data/idb-source.js';

class FavoriteStoriesView extends HTMLElement {
  connectedCallback() {
    this.render();
    this._loadFavoriteStories();
  }

  render() {
    this.innerHTML = `
      <h2 style="text-align:center; font-size: 2rem;">Cerita Favorit Anda</h2>
      <div id="favorite-list-container" class="story-list">
        <p style="text-align:center;">Memuat cerita favorit...</p>
      </div>
    `;
  }

  async _loadFavoriteStories() {
    const favoriteListContainer = this.querySelector('#favorite-list-container');
    favoriteListContainer.innerHTML = '';

    const stories = await FavoriteStoryIdb.getAll();

    if (stories.length === 0) {
      favoriteListContainer.innerHTML = '<p style="text-align:center;">Anda belum memiliki cerita favorit.</p>';
      return;
    }

    stories.forEach(story => {
      const storyItem = document.createElement('story-item');
      // Beri tahu komponen bahwa ia berada di halaman favorit
      storyItem.dataset.context = 'favorites'; 
      storyItem.story = story;
      
      // Tambahkan event listener untuk memuat ulang daftar saat item dihapus
      storyItem.addEventListener('story-deleted', () => {
        this._loadFavoriteStories();
      });

      favoriteListContainer.appendChild(storyItem);
    });
  }
}

customElements.define('favorite-stories-view', FavoriteStoriesView);