import HomePresenter from '../presenter/home-presenter.js';
import StoryAPI from '../api/story-api.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class HomeView extends HTMLElement {
    constructor() {
        super();
        HomePresenter.init({ view: this, model: StoryAPI });
    }

    connectedCallback() {
        this.render();
        HomePresenter.fetchStories();
    }

    render() {
        this.innerHTML = `
            <h2 style="text-align:center; font-size: 2rem;">Jelajahi Cerita</h2>
            <div id="map" style="margin-bottom: 2rem;"></div>
            <div id="story-list-container" class="story-list"></div>
        `;
    }

    showLoading() {
        this.querySelector('#story-list-container').innerHTML = '<p style="text-align:center;">Memuat cerita...</p>';
    }

    displayStories(stories) {
        const storyListContainer = this.querySelector('#story-list-container');
        storyListContainer.innerHTML = ''; 

        if (!stories || stories.length === 0) {
            storyListContainer.innerHTML = '<p style="text-align:center;">Belum ada cerita untuk ditampilkan.</p>';
            this._initializeMap([]);
            return;
        }

        // Bagian ini yang membuat dan menampilkan story-item
        stories.forEach(story => {
            const storyItem = document.createElement('story-item');
            storyItem.story = story;
            storyListContainer.appendChild(storyItem);
        });

        this._initializeMap(stories);
    }

    displayError(message) {
        this.querySelector('#story-list-container').innerHTML = `<p style="text-align:center; color:red;">Error: ${message}</p>`;
    }

    _initializeMap(stories) {
        const mapElement = this.querySelector('#map');
        if (mapElement && mapElement._leaflet_id) {
            return;
        }
        
        const map = L.map(mapElement).setView([-2.5489, 118.0149], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        stories.forEach(story => {
            if (story.lat && story.lon) {
                L.marker([story.lat, story.lon])
                    .addTo(map)
                    .bindPopup(`<b>${story.name}</b><br>${story.description.substring(0, 50)}...`);
            }
        });
    }
}

customElements.define('home-view', HomeView);