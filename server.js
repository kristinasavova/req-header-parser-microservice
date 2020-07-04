const express = require('express');

const app = express();
 
const cors = require('cors');
const routes = require('./routes');

app.use(cors({ optionSuccessStatus: 200 })); 
app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    console.log('Error!', err); 
    res.status(err.status || 500);
    res.json({ error: err.message }); 
});

// listen for requests 
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is listening on port ' + listener.address().port);
});
