module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res){
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(site) {
                    console.log(site);
                    res.json(site);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        
    }
    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(sites) {
                    res.send(sites);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
    function findWebsiteById(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .findWebsiteById(id)
            .then(
                function(site) {
                    res.json(site);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function updateWebsite(req, res){
        var id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(id, newWebsite)
            .then(
                function(site) {
                    res.json(site);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    function deleteWebsite(req, res){
        var id = req.params.websiteId;
        websiteModel
            .deleteWebsite(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(err) {
                    res.send(400);
                }
            );
    }
};