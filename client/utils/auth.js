import { jwtDecode} from 'jwt-decode';

class AuthService {
    getProfile() {
        try {
            return jwtDecode(this.getToken());
        } catch (err) {
            return null;
        }
        
    }

    loggedIn() {
        // Checks for valid token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        // Checks if token is expired
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Gets token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token then redirects to home
        localStorage.setItem('id_token', idToken);
        window.location.assign('/')
    }

    logout() {
        // Removes toekn from local storage when user logs out, then redirect to home.
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();