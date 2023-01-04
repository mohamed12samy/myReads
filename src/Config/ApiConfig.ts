export const Api = () => {
    let token = localStorage.token;
    const api = "https://reactnd-books-api.udacity.com";

    if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

    const headers = {
        Accept: "application/json",
        Authorization: token,
    };
    return { baseUrl: api, headers }
} 