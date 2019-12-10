export const getInterestedItem = {
    url: '/api/v1/recommend',
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