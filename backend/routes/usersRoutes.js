const UsersController = require("../controllers/usersController");
const passport = require("passport");

module.exports = (app, upload) => {
  // TRAER DATOS
  app.get("/api/users/getAllT", UsersController.getAll);
  app.get("/api/users/findById/:id", passport.authenticate("jwt", { session: false }), UsersController.findById);
  app.get("/api/users/findDeliveryMen", passport.authenticate("jwt", { session: false }), UsersController.findDeliveryMen);
  app.get("/api/users/getAdminsNotificationTokens", passport.authenticate("jwt", { session: false }), UsersController.getAdminsNotificationTokens);

  // GUARDAR DATOS
  app.post('/api/users/createT', upload.single('image', 1), UsersController.registerWithImage);
  // app.post("/api/users/createT", UsersController.registerWithImage);
  app.post("/api/users/loginT", UsersController.login);
  app.post("/api/users/logout", UsersController.logout);

  // ACTUALIZAR DATOS
  app.put("/api/users/update", passport.authenticate("jwt", { session: false }), upload.array("image", 1), UsersController.update);
  app.put("/api/users/updateNotificationToken", UsersController.updateNotificationToken);
};
