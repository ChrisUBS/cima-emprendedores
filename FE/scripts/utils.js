function saveUserData(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.userName);
}

function getToken() {
    return localStorage.getItem('token');
}

function checkAuthentication() {
    return localStorage.getItem('token') ? true : false;
}