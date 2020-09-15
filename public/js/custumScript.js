$(window).on('action:ajaxify.end', function (event, data) {
  console.log('-------- data ----------', data, event)
  var xhttp = new XMLHttpRequest()

  var paylod = {}
  switch (data.tpl_url) {
    case 'categories':
      payload = {
        eid: 'IMPRESSION',
        pageid: 'categories-page',
        type: 'System Response',
        uri: '',
        eName: 'User lands on the categories page',
        edata: {
          type: 'System Response', // Required. Impression type (list, detail, view, edit, workflow, search)
          subtype: '', // Optional. Additional subtype. "Paginate", "Scroll"
          pageid: 'categories-page', // Required. Unique page id
          uri: data.url, // Required. Relative URL of the content
          visits: ''
        }
      }
      xhttp.open(
        'POST',
        'https://dev.sunbirded.org/discussions/api/telemerty',
        true
      )
      xhttp.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
      xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText)
        console.log(jsonResponse, '=========================')
        console.log(jsonResponse.data, '==========>>>>>>>>>>>===============')
        // do something with jsonResponse
      }
      xhttp.send(JSON.stringify(payload))
      break
    case 'category':
      payload = {
        eid: 'IMPRESSION',
        pageid: 'topic-page',
        type: 'System Response',
        uri: '',
        eName: 'User lands on the topics page',
        edata: {
          type: 'System Response', // Required. Impression type (list, detail, view, edit, workflow, search)
          subtype: '', // Optional. Additional subtype. "Paginate", "Scroll"
          pageid: 'topic-page', // Required. Unique page id
          uri: data.url, // Required. Relative URL of the content
          visits: ''
        }
      }
      xhttp.open('POST', 'http://localhost:4567/api/telemerty', true)
      xhttp.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
      xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText)
        console.log(jsonResponse, '=========================')
        console.log(jsonResponse.data, '==========>>>>>>>>>>>===============')
        // do something with jsonResponse
      }
      xhttp.send(JSON.stringify(payload))
      break
    case 'account/profile':
      payload = {
        eid: 'IMPRESSION',
        pageid: 'profile-page',
        type: 'System Response',
        uri: '',
        eName: 'User lands on the profile page',
        edata: {
          type: 'System Response', // Required. Impression type (list, detail, view, edit, workflow, search)
          subtype: '', // Optional. Additional subtype. "Paginate", "Scroll"
          pageid: 'profile-page', // Required. Unique page id
          uri: data.url, // Required. Relative URL of the content
          visits: ''
        }
      }
      xhttp.open('POST', 'http://localhost:4567/api/telemerty', true)
      xhttp.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
      xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText)
        console.log(jsonResponse, '=========================')
        console.log(jsonResponse.data, '==========>>>>>>>>>>>===============')
        // do something with jsonResponse
      }
      xhttp.send(JSON.stringify(payload))
      break
  }
})



// "scripts": ["./public/js/custumScript.js"]
