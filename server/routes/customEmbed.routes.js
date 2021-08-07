const customEmbedController = require('../controllers/customEmbed.controller');

module.exports = (app) => {
    app.post("/api/commands/new",customEmbedController.create);
    app.put("/api/commands/update/:id",customEmbedController.update);
    app.delete("/api/commands/delete/:id",customEmbedController.delete);
    app.get("/api/commands/findid/:id",customEmbedController.specific);
    app.get("/api/commands/findname/:command",customEmbedController.specificName);
    app.get("/api/commands",customEmbedController.index);
};