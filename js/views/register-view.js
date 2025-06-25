import RegisterPresenter from '../presenter/register-presenter.js';
import StoryAPI from '../api/story-api.js';

class RegisterView extends HTMLElement {
    constructor() {
        super();
        RegisterPresenter.init({
            view: this,
            model: StoryAPI,
        });
    }

    connectedCallback() {
        this.render();
        this.querySelector('#registerForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            RegisterPresenter.register(name, email, password);
        });
    }

    render() {
        this.innerHTML = `
            <div class="form-container">
                <h2>Register</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" minlength="8" required>
                    </div>
                    <button type="submit" class="button">Register</button>
                    <p id="error-message" style="color:red; text-align:center; margin-top:1rem;"></p>
                </form>
            </div>
        `;
    }
    
    showLoading() { this.querySelector('#error-message').textContent = 'Registering...'; }
    onRegisterSuccess() { window.location.hash = '#/'; }
    onRegisterFailure(message) { this.querySelector('#error-message').textContent = message; }
}

customElements.define('register-view', RegisterView);