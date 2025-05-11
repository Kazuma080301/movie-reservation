const mongoose = require('mongoose');
const repl = require('repl');
const path = require('path');
const fs = require('fs');
const defaultPath = `${process.cwd()}/src/modules`

mongoose.connect('mongodb+srv://kazuma:manik123@cluster.2ysbuas.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const models = {};

dirs = fs.readdirSync(defaultPath, { withFileTypes: true }).filter(d => d.isDirectory());

dirs.forEach(dir => {
  modelName = `${dir.name[0].toUpperCase()}${dir.name.slice(1)}`
    modelPath = path.join(defaultPath, dir.name, `${modelName}.js`);
    if (fs.existsSync(modelPath)) {
      const model = require(modelPath);
      models[model.modelName] = model;
    }
});


console.log(models)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');

  const r = repl.start('> ');
  r.context.mongoose = mongoose;

  Object.assign(r.context, models);
});