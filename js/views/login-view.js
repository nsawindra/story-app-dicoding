import LoginPresenter from '../presenter/login-presenter.js';
import StoryAPI from '../api/story-api.js';

class LoginView extends HTMLElement {
    constructor() {
        super();
        LoginPresenter.init({ view: this, model: StoryAPI });
    }

    connectedCallback() {
        this.render();
        this.querySelector('#loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            // VIEW: Memanggil presenter, bukan API langsung
            LoginPresenter.login(email, password);
        });
    }

    render() {
        this.innerHTML = `
            <div class="form-container">
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="button">Login</button>
                    <p id="error-message" style="color:red; text-align:center; margin-top:1rem;"></p>
                    <p style="text-align:center; margin-top:1rem;">Belum punya akun? <a href="#/register">Register di sini</a></p>
                </form>
            </div>
        `;
    }

    showLoading() { this.querySelector('#error-message').textContent = 'Logging in...'; }
    onLoginSuccess() {
        window.location.hash = '#/home';
        window.location.reload(); // Reload untuk update app-bar
    }
    onLoginFailure(message) { this.querySelector('#error-message').textContent = message; }
}

customElements.define('login-view', LoginView);