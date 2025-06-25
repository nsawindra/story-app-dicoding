const routes = {
    '/': 'login-view',
    '/register': 'register-view',
    '/home': 'home-view',
    '/add-story': 'add-story-view',
    '/favorites': 'favorite-stories-view',
    'not-found': 'not-found-view',
};

const router = () => {
    const path = window.location.hash.slice(1) || '/';
    const page = routes[path] || routes['not-found'];
    const mainContent = document.getElementById('main-content');
    
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            mainContent.innerHTML = `<${page}></${page}>`;
            window.scrollTo(0, 0);
        });
    } else {
        mainContent.innerHTML = `<${page}></${page}>`;
        window.scrollTo(0, 0);
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
