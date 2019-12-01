export const saveEvent = {
    url: '/api/v1/event/save',
    request:
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: "",
          event_name: "",
          event_time:"",
          page_name:"",
          page_number:"",
          filter_category_id:"",
          filter_keyword:""
        })
    }
}