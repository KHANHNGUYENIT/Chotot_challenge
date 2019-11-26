export const login = {
    url: '/api/v1/authentication/login',
    request:
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: "",
          password: "",
        })
    }
}