module.exports = function(app, models) {

    var pageModel = models.pageModel;
    
	var pages = [
      { "_id": "321", "name": "Post 1", "websiteId": "456" },
      { "_id": "432", "name": "Post 2", "websiteId": "456" },
      { "_id": "543", "name": "Post 3", "websiteId": "456" },
      { "_id": "333", "name": "Post 4", "websiteId": "567" }
    ];

	app.post("/api/website/:websiteId/page", createPage);
	app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
	app.get("/api/page/:pageId", findPageById);
	app.put("/api/page/:pageId", updatePage);
	app.delete("/api/page/:pageId", deletePage);

	function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        
        pageModel
            .createPage(websiteId, page)
            .then(
                function(page) {
                    res.json(page);
                },
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
	}

	function findAllPagesForWebsite(req, res) {
		var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.send(pages);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}
		
	function findPageById(req, res) {
		var id = req.params.pageId;
        pageModel
            .findPageById(id)
            .then(
                function(page) {
                    res.json(page);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}
	
	function updatePage(req, res) {
		var id = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(id, newPage)
            .then(
                function(page) {
                    res.json(page);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}

	function deletePage(req, res) {
		var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(err) {
                    res.send(400);
                }
            );
	}


}