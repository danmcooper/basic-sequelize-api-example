module.exports = (app, postModel) => {
  app.get( "/posts", (req, res) =>
    postModel.findAll().then( (result) => res.json(result) )
  );

  app.get( "/post/:id", (req, res) =>
    postModel.findAll({
      where: {
        id: req.params.id
      }}).then( (result) => res.json(result))
  );

  app.post("/post", (req, res) => 
    postModel.create({
      title: req.body.title,
      content: req.body.content
    }).then( (result) => res.json(result) )
  );

  app.put( "/post/:id", (req, res) =>
    postModel.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  app.delete( "/post/:id", (req, res) =>
    postModel.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}