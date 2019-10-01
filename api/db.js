const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = {
	mongoose,
	connect: (name, port) => mongoose.connect(`mongodb://localhost:${port}/${name}`),
    disconnect: done => mongoose.disconnect(done)
};