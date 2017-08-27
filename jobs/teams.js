var functions = require('firebase-functions');
var admin = require("firebase-admin");
var jsdom = require("jsdom");
var request = require('request');
var rp = require('request-promise-native');

var serviceAccount = require("./private-key.json");
const { JSDOM } = jsdom;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://manager-alert.firebaseio.com"
});

function loadTeams(url) {
    return rp(url).then(function(html) {
        const dom = new JSDOM(html);
        const teamlogos = dom.window.document.querySelectorAll("#teamlogos .team-logo > a.wappen");

        const promises = [];
        const database = admin.database();
        for (var anchor of teamlogos) {
            var href = anchor.getAttribute('href');
            var img = anchor.querySelector('img');

            var id = href.split('/')[2];
            var name = img.getAttribute('title');
            var logo = img.getAttribute('src');

            promises.push(database.ref('teams/' + id + '/name').set(name));
            promises.push(database.ref('teams/' + id + '/logo').set(logo));
        }

        return Promise.all(promises);        
    });
}

league1Url = 'https://www.ligainsider.de/bundesliga-news/uebersicht/';
league2Url = 'https://www.ligainsider.de/2-bundesliga-news/uebersicht/';

const league1$ = loadTeams(league1Url);
const league2$ = loadTeams(league2Url);

Promise.all([league1$, league2$]).then(() => process.exit());
