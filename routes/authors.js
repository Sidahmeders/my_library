const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//* all authors route
router.get('/', async (req, res) => {
    const searchOption = {}
    if(req.query.name != null && req.query.name !== "") {
        searchOption.name = new RegExp(req.query.name, "i")
    }
    const allAuthors = await Author.find(searchOption);
    try {
        res.render('authors/index', {
            authors: allAuthors,
            searchOpt: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//* new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//* create author route
router.post('/', async (req, res) => {
    const author = new Author({ name: req.body.name })
    try {
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author, 
            errMessage: "error creating new author"
        })
    }
})

module.exports = router;