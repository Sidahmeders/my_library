const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')


//* all authors route
router.get('/', async (req, res) => {
    const searchOption = {}
    if(req.query.name != null && req.query.name !== "") {
        searchOption.name = new RegExp(req.query.name, "i")
    }
    try {
        const allAuthors = await Author.find(searchOption);
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
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author, 
            errMessage: "error creating new author"
        })
    } 
})

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books  = await Book.find({author: author.id}).limit(6).exec()
        res.render('authors/show', {
            author: author,
            books: books
        })
    } catch {
        res.redirect('/authors')
    }
})

router.get('/:id/edit', async (req, res) => {
    const author = await Author.findById(req.params.id)
    try {
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    } 
})

router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author, 
                errMessage: "error updating author"
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let author 
    try {
        author = await Author.findById(req.params.id)
        author.remove()
        res.redirect('/authors')
    } catch {
        res.redirect(`/authors/${author.id}`)
    }
})


module.exports = router;
