const JWT = require('jsonwebtoken');
const moment = require('moment');
const { JWT_SECRET } = require('../configs/keys');
// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
    "196937481355-4iif1srk1krg51fqnqm7h0guofr0hg6v.apps.googleusercontent.com",
    "GD_J2PnCkvzMAXcFU2N3wfyB"
)

signToken = user => {
    return JWT.sign({
        iss: 'Suresh',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

getEvents = token => {
    return new Promise((resolve, reject) => {
        let userEvents = [];

        // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
        oAuth2Client.setCredentials({
            access_token: token
        })

        const auth = oAuth2Client;
        const calendar = google.calendar({ version: 'v3', auth });
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);

            const events = res.data.items;
            if (events.length) {
                // console.log('Upcoming 10 events:');
                events.map((event) => {
                    let userEventObj = {};
                    userEventObj.start = moment(event.start.dateTime).format("hh:mm A") || moment(event.start.date).format("hh:mm A");
                    userEventObj.end = moment(event.end.dateTime).format("hh:mm A") || moment(event.end.date).format("hh:mm A");
                    userEventObj.location = event.location || "Not Yet Decided";
                    userEventObj.summary = event.summary || "Not Yet Decided";
                    userEventObj.date = moment(event.start.dateTime).format('YYYY-MM-DD') || moment(event.start.date).format('YYYY-MM-DD')
                    userEvents.push(userEventObj)
                });
                resolve(userEvents);
            } else {
                // console.log('No upcoming events found.');
                resolve(userEvents);
            }
        });
    });
}


module.exports = {
    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log('In google auth');
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    getCalendar: async (req, res, next) => {
        const events = await getEvents(req.body.access_token);
        res.status(200).json(events);
    },


    dashboard: async (req, res, next) => {
        console.log('I managed to get here in dashboard');
        res.json({
            secret: req.user.local.name,
            methods: req.user.methods
        });
    },

    checkAuth: async (req, res, next) => {
        console.log('We managed to get here!');
        res.json({ success: true });
    }
}