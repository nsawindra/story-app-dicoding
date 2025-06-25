import FavoriteStoryIdb from '../data/idb-source.js';

class StoryItem extends HTMLElement {
    set story(story) {
        this._story = story;
        this.render();
    }

    render() {
        const creationDate = new Date(this._story.createdAt).toLocaleDateString('id-ID', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        // Tentukan tombol mana yang akan ditampilkan berdasarkan konteks
        const isFavoriteContext = this.dataset.context === 'favorites';
        const actionButton = isFavoriteContext
            ? `<button class="button button-danger delete-favorite-button">Hapus dari Favorit</button>`
            : `<button class="button save-favorite-button">Simpan ke Favorit</button>`;

        this.innerHTML = `
            <style>
                .story-card { display: block; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; text-decoration: none; color: inherit; }
                .story-card:hover { transform: translateY(-5px); transition: transform 0.2s; }
                .story-card img { width: 100%; height: 200px; object-fit: cover; }
                .story-card-content { padding: 1rem; }
                .story-card-content h3 { margin-top: 0; }
                .story-card-actions { margin-top: 1rem; }
                .button-danger { background-color: #e74c3c; }
            </style>
            <article class="story-card">
                <img src="${this._story.photoUrl}" alt="Gambar cerita dari ${this._story.name}">
                <div class="story-card-content">
                    <h3>Oleh: ${this._story.name}</h3>
                    <p><small>Diunggah pada: ${creationDate}</small></p>
                    <p>${this._story.description}</p>
                    <div class="story-card-actions">
                        ${actionButton}
                    </div>
                </div>
            </article>
        `;

        this._addEventListeners();
    }

    _addEventListeners() {
        // Event listener untuk tombol Simpan
        const saveButton = this.querySelector('.save-favorite-button');
        if (saveButton) {
            saveButton.addEventListener('click', async (event) => {
                event.stopPropagation();
                await FavoriteStoryIdb.put(this._story);
                alert(`Cerita "${this._story.name}" berhasil disimpan ke favorit!`);
            });
        }

        // Event listener untuk tombol Hapus
        const deleteButton = this.querySelector('.delete-favorite-button');
        if (deleteButton) {
            deleteButton.addEventListener('click', async (event) => {
                event.stopPropagation();
                await FavoriteStoryIdb.delete(this._story.id);
                // Kirim event custom untuk memberitahu view agar me-render ulang
                this.dispatchEvent(new CustomEvent('story-deleted', { bubbles: true }));
            });
        }
    }
}

customElements.define('story-item', StoryItem);