const uidGenerator = require('node-unique-id-generator');

class Book {
    constructor(title = "", desc = "", authors="", favorite="", fileCover="", fileName="", id = uidGenerator.generateUniqueId()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

module.exports = Book;
