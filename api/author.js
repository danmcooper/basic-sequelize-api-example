module.exports = (app, authorModel) => {
  app.get( "/author/:id", (req, res) =>
    authorModel.findAll({
    	where: {
    		id: req.params.id
    	}}).then( (result) => res.json(result))
  );

  app.get( "/authors", (req, res) =>
    authorModel.findAll().then( (result) => res.json(result) )
  );  
}