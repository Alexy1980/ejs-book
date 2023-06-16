const express = require('express');
const router = express.Router();
const {Book} = require('../models');

// create store
const stor = {
    book: [],
};

// заполняем store
[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`, `author ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`);
    stor.book.push(newBook);
});

router.get('/', (req, res) => {
    const {book} = stor;
    res.render("book/index", {
        title: "Book",
        books: book,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Book | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.redirect('/book')
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    // если мы находим запись
    if (idx !== -1) {
        res.render("book/view", {
            title: "Book | view",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/update", {
            title: "Book | view",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title, 
            desc, 
            authors, 
            favorite, 
            fileCover, 
            fileName
        };
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect(`/book`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;

