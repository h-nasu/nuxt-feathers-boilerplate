//const nuxtJs = require('./nuxt.js');
const { render } = require('./nuxt.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  //app.use(nuxtJs.render);
  app.use((req, res, next) => {
    const accepts = req.accepts('html', 'json');
    if (accepts === 'json'
    || req.path.match(/\/auth\/facebook/) ) {
      return next();
    }
    //if (!isTestEnv) render(req, res, next);
    render(req, res, next);
  });
};
