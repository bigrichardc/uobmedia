var expertRepository;

app.registerInitialise(function () {

    expertsRepository = (function () {

        var cacheKeys = { AllExperts: "%EXPERTS_ALL" };

        var expertsURL = "http://www.birmingham.ac.uk/web_services/Staff.svc/";

        var getExpertsAll = Promise.method(function () {
            return new Promise(function (resolve, reject) {
                return new RemoteServiceManager.FetchRemoteCache(expertsURL, cacheKeys.AllExperts).then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            });
        });
        ``
        return {
            GetAllExperts: getExpertsAll
        }
    })();

});