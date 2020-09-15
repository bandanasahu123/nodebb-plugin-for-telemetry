var user = module.parent.require('./user')
var Plugin = (module.exports = {})
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

Plugin.load = function (params, callback) {
  console.log('-----------------', params, '-------------------------')
  var router = params.router
  var middleware = params.middleware

  // Define the function that renders the custom route.
  function renderSend (req, res, next) {
    // console.log('>>>>>>>>>>>>>>>>>>>>', req)
    console.log('>>>>>>>>>>>>>>>>>>>>', req.body)
    console.log('>>>>>>>>>>>>>>>>>>>>', `IMPRESSION:${uuidv4()}`)
    console.log(
      '>>>>>>>>>>>>>>>>>>>>',
      req.session.Session,
      req.sessionID,
      req.uid,
      req.server
    )
    const body = JSON.parse(Object.keys(req.body)[0])
    user.getUsers([2], 1, function (err, users) {
      console.log(users)
    })

    let payload = {
      id: 'api.sunbird.telemetry',
      ver: '3.0',
      params: {
        msgid: uuidv4()
      },
      ets: Date.now(),
      events: [
        {
          eid: body.eid,
          ets: Date.now(),
          ver: '3.0',
          mid: `IMPRESSION:${uuidv4()}`,
          actor: {
            id: req.uid,
            type: 'User'
          },
          context: {
            channel: 'b00bc992ef25f1a9a8d63291e20efc8d',
            pdata: {
              id: 'dev.sunbird.portal',
              ver: '3.2.11',
              pid: 'sunbird-portal'
            },
            env: 'discussions',
            sid: req.sessionID,
            did: '4eb8ae6a06dbbad37fba723a7019aa7b',
            cdata: [
              {
                id: 'Desktop',
                type: 'Device'
              },
              {
                id: 'default',
                type: 'Theme'
              }
            ],
            rollup: {
              l1: 'b00bc992ef25f1a9a8d63291e20efc8d'
            }
          },
          object: {},
          tags: ['b00bc992ef25f1a9a8d63291e20efc8d'],
          edata: body.edata
        }
      ]
    }

    console.log(payload)
    // https://dev.sunbirded.org/content/data/v1/telemetry
	// http://localhost:4567/api/telemerty
    axios
      .post('https://dev.sunbirded.org/content/data/v1/telemetry', payload)
      .then(async function (response) {
        console.log('>>>>>> res=ponse <<<<<<<<<', response.data)
        res.send({
          status: true,
          message: 'Its passed',
          data: { reqBody: req.body, payloadData: payload }
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        res.send({ status: false, message: 'Its not passed', data: null })
      })
  }
  router.post('/api/telemerty', renderSend)
  callback()
}
