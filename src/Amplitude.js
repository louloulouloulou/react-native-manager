const Amplitude = require('amplitude')
const config = require('./config.json')
const amplitude = new Amplitude(config.amplitude.apiKey)

const track = (event) => {
    amplitude.track({ 
        event_type: event.event_type,
        user_id: event.user.uid,
        // configure event properties and user properties here
        event_properties: {
            name: event.name || null,
            phone: event.phone || null,
            shift: event.shift || null
        }
    })
}

export default track