const init = function ErrorHandler(app) {

  app.use((req, res, next)=>{
    console.log(res);
    console.log(res.statusCode);
    res.render('error.ejs');
  });
}

module.exports = init;
