import AddStoryPresenter from '../presenter/add-story-presenter.js';
import StoryAPI from '../api/story-api.js';
import { initCamera, takePicture, stopCamera } from '../utils/camera.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class AddStoryView extends HTMLElement {
    constructor() {
        super();
        AddStoryPresenter.init({ view: this, model: StoryAPI });
        this._photo = null;
    }

    connectedCallback() {
        // PENTING:
        // 1. Gambar dulu seluruh HTML ke halaman
        this.render();
        // 2. SETELAH HTML ada, baru tambahkan event listener dan inisialisasi peta
        this._initEventListeners();
        this._initMap();
    }
    
    disconnectedCallback() {
        // Mematikan kamera saat pindah halaman
        stopCamera();
    }

    render() {
        this.innerHTML = `
            <div class="form-container">
                <h2><i class="fa-solid fa-plus"></i> Tambah Cerita Baru</h2>
                <form id="addStoryForm">
                    <div class="form-group">
                        <label>Foto</label>
                        <video id="camera-preview" autoplay muted playsinline style="width:100%; border-radius:8px; display:none;"></video>
                        <canvas id="photo-canvas" style="display:none;"></canvas>
                        <img id="photo-result" src="" alt="Hasil foto" style="width:100%; border-radius:8px; display:none;">
                        <button type="button" id="start-camera" class="button"><i class="fa-solid fa-camera"></i> Buka Kamera</button>
                        <button type="button" id="take-picture" class="button" style="display:none;"><i class="fa-solid fa-circle-dot"></i> Ambil Gambar</button>
                    </div>
                    <div class="form-group">
                        <label for="description">Deskripsi</label>
                        <textarea id="description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Lokasi (Klik atau geser marker pada peta)</label>
                        <div id="add-map"></div>
                        <input type="hidden" id="latitude">
                        <input type="hidden" id="longitude">
                    </div>
                    <button type="submit" class="button"><i class="fa-solid fa-upload"></i> Unggah Cerita</button>
                    <p id="upload-status" style="margin-top:1rem; text-align:center;"></p>
                </form>
            </div>
        `;
    }

    _initEventListeners() {
        this.querySelector('#start-camera').onclick = () => {
            initCamera(
                this.querySelector('#camera-preview'),
                this.querySelector('#start-camera'),
                this.querySelector('#take-picture')
            );
        };
        this.querySelector('#take-picture').onclick = () => {
            const canvas = this.querySelector('#photo-canvas');
            canvas.toBlob((blob) => {
                this._photo = blob;
            }, 'image/jpeg');
            takePicture(
                this.querySelector('#camera-preview'),
                canvas,
                this.querySelector('#photo-result'),
                this.querySelector('#take-picture')
            );
        };
        this.querySelector('#addStoryForm').addEventListener('submit', (event) => {
            event.preventDefault();
            AddStoryPresenter.uploadStory({
                photo: this._photo,
                description: this.querySelector('#description').value,
                lat: this.querySelector('#latitude').value,
                lon: this.querySelector('#longitude').value,
            });
        });
    }
    
    _initMap() {
        const map = L.map('add-map').setView([-2.5489, 118.0149], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        const marker = L.marker([-2.5489, 118.0149], { draggable: true }).addTo(map);
        const updateCoords = (lat, lng) => {
            this.querySelector('#latitude').value = lat;
            this.querySelector('#longitude').value = lng;
        };
        map.on('click', (e) => {
            marker.setLatLng(e.latlng);
            updateCoords(e.latlng.lat, e.latlng.lng);
        });
        marker.on('dragend', (e) => {
            updateCoords(e.target.getLatLng().lat, e.target.getLatLng().lng);
        });
        updateCoords(-2.5489, 118.0149);
    }

    showLoading() { this.querySelector('#upload-status').textContent = 'Mengunggah...'; }
    onUploadSuccess() {
        stopCamera();
        alert('Story berhasil diunggah!');
        window.location.hash = '#/home';
    }
    onUploadFailure(message) { this.querySelector('#upload-status').textContent = `Error: ${message}`; }
}

customElements.define('add-story-view', AddStoryView);