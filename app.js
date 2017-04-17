let express = require('express');
let configureApp = require('./config/configureApp');
let index = require('./routes/index');
let catch404=require('./catch404');
let errorHandler = require('./errorHandler');
let authenticate = require('./auth/login').authenticate;
require('./seed/seedAdminUser')();
let meetingTypes = require('./routes/meetingTypes');
let app = express();
let alwaysReject = require('./auth/alwaysReject');
let alwaysAllow = require('./auth/alwaysAllow');
let genericApiRoutes = require('./routes/generic');
configureApp(app,__dirname);

// let makeRouter = require('./routes/openRoute');
// app.use('/open',makeRouter());
// app.use('/authButOpen',alwaysAllow,makeRouter());
// app.use('/closed',alwaysReject,makeRouter());;


//
//
app.use('/', index);
app.use('/meetingTypes',meetingTypes);
app.use('/genericApi',genericApiRoutes);

app.use(catch404);
app.use(errorHandler);
module.exports = app;
