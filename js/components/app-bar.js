class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const token = localStorage.getItem('authToken');
        let navLinks = `
            <a href="#/" class="nav-link">Login</a>
            <a href="#/register" class="nav-link">Register</a>
        `;

        if (token) {
            navLinks = `
                <a href="#/home" class="nav-link">Home</a>
                <a href="#/favorites" class="nav-link">Favorit</a>
                <a href="#/add-story" class="nav-link">Add Story</a>
                <a href="#" id="logout-button" class="nav-link">Logout</a>
            `;
        }

        this.innerHTML = `
            <style>
                .app-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 5%;
                    background-color: var(--primary-color);
                    color: white;
                }
                .app-bar h1 {
                    margin: 0;
                    font-size: 1.8rem;
                }
                .app-bar nav {
                    display: flex;
                    align-items: center;
                }
                .app-bar nav a {
                    color: white;
                    text-decoration: none;
                    margin-left: 1.5rem;
                    font-size: 1.1rem;
                    transition: opacity 0.3s;
                }
                .app-bar nav a:hover {
                    opacity: 0.8;
                }
                .skip-link {
                    position: absolute;
                    top: -100px;
                    left: 0;
                    background: var(--secondary-color);
                    color: white;
                    padding: 10px;
                    z-index: 10000;
                    transition: top 0.3s;
                }
                .skip-link:focus {
                    top: 0;
                }
                .notification-bell {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-left: 1rem;
                    padding: 0.5rem;
                }
            </style>
            <a href="#main-content" class="skip-link">Lewati ke Konten</a>
            <div class="app-bar">
                <h1><i class="fas fa-book-open"></i> StoryVerse</h1>
                <nav>
                    ${navLinks}
                    <button id="notification-bell" class="notification-bell" title="Aktifkan Notifikasi">
                        <i class="far fa-bell"></i>
                    </button>
                </nav>
            </div>
        `;
    }

    addEventListeners() {
        // Event Listener untuk Tombol Logout
        const logoutButton = this.querySelector('#logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem('authToken');
                window.location.hash = '#/';
                window.location.reload();
            });
        }

        // Event Listener untuk Tombol Notifikasi
        const notificationButton = this.querySelector('#notification-bell');
        if (notificationButton) {
            notificationButton.addEventListener('click', async () => {
                try {
                    const NotificationHelper = (await import('../utils/notification-helper.js')).default;
                    NotificationHelper.init();
                } catch (error) {
                    console.error("Gagal memuat modul notifikasi:", error);
                }
            });
        }
    }
}

customElements.define('app-bar', AppBar);