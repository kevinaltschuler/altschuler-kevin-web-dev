module.exports = function(app, models) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;

	var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "1234", "widgetType": "HEADER", "pageId": "333", "size": 2, "text": "GIZMODO"},
        { "_id": "2344", "widgetType": "HEADER", "pageId": "333", "size": 4, "text": "Lorem ipsum"},
        { "_id": "3454", "widgetType": "IMAGE", "pageId": "333", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "4564", "widgetType": "HTML", "pageId": "333", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "5674", "widgetType": "HEADER", "pageId": "333", "size": 4, "text": "Lorem ipsum"},
        { "_id": "6784", "widgetType": "YOUTUBE", "pageId": "333", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "7894", "widgetType": "HTML", "pageId": "333", "text": "<p>Lorem ipsum</p>"}
    ];


    app.post ("/api/upload", upload.single('myFile'), uploadImage);

	app.post("/api/page/:pageId/widget", createWidget);
	app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
	app.get("/api/widget/:widgetId", findWidgetById);
	app.put("/api/widget/:widgetId", updateWidget);
	app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widgetModel
            .uploadImage(widgetId, filename)
            .then(
                function(widget) {
                    res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

	function createWidget(req, res) {
		var widget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}

	function findAllWidgetsForPage(req, res) {
		var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
	}
		
	function findWidgetById(req, res) {
		var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}
	
	function updateWidget(req, res) {
		var id = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
	}

	function deleteWidget(req, res) {
		var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(err) {
                    res.send(400);
                }
            );
	},

    function reorderWidget(pageId, start, end, res) {
        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function(page) {
                    res.send(200);
                },
                function(err) {
                    res.send(400);
                }
            );
    }

}