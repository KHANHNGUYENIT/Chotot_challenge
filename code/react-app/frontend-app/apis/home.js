export const getItem = {
    url: '/api/v1/item',
    request:
    {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }
}

export const getInterestedItem = {
  url: '/api/v1/item',
  request:
  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: "",
      })
  }
}