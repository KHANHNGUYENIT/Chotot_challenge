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

export const getItemDetail = {
  url: '/api/v1/item/detail',
  request:
  {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  }
}