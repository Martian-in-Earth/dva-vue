var cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export default function dynamic(config) {
  var app = config.app,
      resolveModels = config.models,
      resolveComponent = config.component;

  var models = typeof resolveModels === 'function' ? resolveModels() : [];
  var component = resolveComponent();
  return function () {
    return new Promise(function (resolve) {
      Promise.all([].concat(models, [component])).then(function (ret) {
        if (!models || !models.length) {
          return resolve(ret[0]);
        } else {
          var len = models.length;
          ret.slice(0, len).forEach(function (m) {
            registerModel(app, m);
          });
          resolve(ret[len]);
        }
      });
    });
  };
}