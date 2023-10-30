const express = require('express');
const mongoose = require('mongoose');

const ShortUrl = require('./models/shortUrl');

const app = express();

mongoose.connect('mongodb://localhost:27017/LearnNodejs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (request, response) => { 
    const shortUrls = await ShortUrl.find();
    console.log('shortUrls :: ', shortUrls);
    response.render('index', { shortUrls });
});

app.post('/shortUrls', async (request, response) => {
    await ShortUrl.create({ full: request.body.fullUrl });

    response.redirect('/');
});

app.get('/:shortUrl', async (request, response) => { 
    const shortUrl = await ShortUrl.findOne({ short: request.params.shortUrl });

    console.log('shortUrl :: ', shortUrl);

    if (!shortUrl) { 
        return response.sendStatus(404);
    }

    shortUrl.clicks++;

    shortUrl.save();

    response.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);