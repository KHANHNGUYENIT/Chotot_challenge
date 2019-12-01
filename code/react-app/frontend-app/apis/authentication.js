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

export const logout = {
  url: '/api/v1/authentication/logout',
  request:
  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  }
}

export const checkLogin = {
  url: '/api/v1/authentication/check-if-logged-in',
  request:
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: "",
        })
    }
}