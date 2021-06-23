var loadConfig = require('@stackbit/sdk').loadConfig;

loadConfig({ dirPath: './' }).then((configResult) => {
    configResult.errors.forEach((error) => {
        console.log(error.message);
    });
});

