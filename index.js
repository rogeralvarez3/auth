'use strict';
const app = require('./app')
require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",

        // contact for security and critical bug notices
        maintainerEmail: "webmaster@coopefacsa.coop",

        // whether or not to run at cloudscale
        cluster: false,
        app: app
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);

