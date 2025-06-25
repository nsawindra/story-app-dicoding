import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


import './components/app-bar.js';
import './components/story-item.js';
import './views/login-view.js';
import './views/register-view.js';
import './views/home-view.js';
import './views/add-story-view.js';
import './views/favorite-stories-view.js';
import './views/not-found-view.js';


import './router.js';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


const mainContent = document.querySelector('#main-content');
const skipLink = document.querySelector('.skip-link');

if (skipLink && mainContent) {
  skipLink.addEventListener('click', (event) => {
    event.preventDefault();
    mainContent.focus();
  });
}