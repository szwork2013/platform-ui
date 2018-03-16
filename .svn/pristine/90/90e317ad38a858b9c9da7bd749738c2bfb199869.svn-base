const cached = {};
export default (model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}
