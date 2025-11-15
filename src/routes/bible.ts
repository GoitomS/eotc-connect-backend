/**
 * AI-generated code by factory.ai Droid
 * Bible routes for EOTConnect - handles Bible reading and search functionality
 */
import { Router } from "express";
import { BiblePassage } from "../models";

const router = Router();

// Get Bible passages by book and chapter
router.get("/book/:book/chapter/:chapter", async (req, res, next) => {
  try {
    const { book, chapter } = req.params;
    const { translation = "ESV", language = "en" } = req.query;
    
    const passages = await BiblePassage.findAll({
      where: {
        book: book.toLowerCase(),
        chapter: Number(chapter),
        translation: translation as string,
        language: language as string,
      },
      order: [['verse', 'ASC']],
    });
    
    if (passages.length === 0) {
      return res.status(404).json({ 
        error: "No passages found",
        book,
        chapter: Number(chapter),
        translation,
        language
      });
    }
    
    res.json({ 
      passages, 
      count: passages.length,
      book,
      chapter: Number(chapter),
      translation,
      language
    });
  } catch (error) {
    next(error);
  }
});

// Get specific Bible verse
router.get("/book/:book/chapter/:chapter/verse/:verse", async (req, res, next) => {
  try {
    const { book, chapter, verse } = req.params;
    const { translation = "ESV", language = "en" } = req.query;
    
    const passage = await BiblePassage.findOne({
      where: {
        book: book.toLowerCase(),
        chapter: Number(chapter),
        verse: Number(verse),
        translation: translation as string,
        language: language as string,
      },
    });
    
    if (!passage) {
      return res.status(404).json({ 
        error: "Passage not found",
        book,
        chapter: Number(chapter),
        verse: Number(verse),
        translation,
        language
      });
    }
    
    res.json({ passage });
  } catch (error) {
    next(error);
  }
});

// Search Bible passages by text content
router.get("/search/:query", async (req, res, next) => {
  try {
    const { query } = req.params;
    const { 
      translation = "ESV", 
      language = "en", 
      book,
      limit = 20, 
      offset = 0 
    } = req.query;
    
    const { Op } = require('sequelize');
    
    const whereClause: any = {
      text: { [Op.iLike]: `%${query}%` },
      translation: translation as string,
      language: language as string,
    };
    
    // Filter by book if specified
    if (book) {
      whereClause.book = (book as string).toLowerCase();
    }
    
    const passages = await BiblePassage.findAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      order: [['book', 'ASC'], ['chapter', 'ASC'], ['verse', 'ASC']],
    });
    
    res.json({ 
      passages, 
      count: passages.length,
      query,
      translation,
      language,
      book: book || 'all'
    });
  } catch (error) {
    next(error);
  }
});

// Get list of available books
router.get("/books", async (req, res, next) => {
  try {
    const { translation = "ESV", language = "en" } = req.query;
    
    const books = await BiblePassage.findAll({
      attributes: ['book'],
      where: {
        translation: translation as string,
        language: language as string,
      },
      group: ['book'],
      order: [['book', 'ASC']],
    });
    
    const bookList = books.map(b => b.book);
    
    res.json({ 
      books: bookList, 
      count: bookList.length,
      translation,
      language
    });
  } catch (error) {
    next(error);
  }
});

// Get chapters for a specific book
router.get("/book/:book/chapters", async (req, res, next) => {
  try {
    const { book } = req.params;
    const { translation = "ESV", language = "en" } = req.query;
    
    const chapters = await BiblePassage.findAll({
      attributes: ['chapter'],
      where: {
        book: book.toLowerCase(),
        translation: translation as string,
        language: language as string,
      },
      group: ['chapter'],
      order: [['chapter', 'ASC']],
    });
    
    const chapterList = chapters.map(c => c.chapter).sort((a, b) => a - b);
    
    res.json({ 
      chapters: chapterList, 
      count: chapterList.length,
      book,
      translation,
      language
    });
  } catch (error) {
    next(error);
  }
});

// Get random verse (daily verse functionality)
router.get("/random", async (req, res, next) => {
  try {
    const { translation = "ESV", language = "en" } = req.query;
    
    // Get a random passage - simplified random selection
    const totalCount = await BiblePassage.count({
      where: {
        translation: translation as string,
        language: language as string,
      }
    });
    
    if (totalCount === 0) {
      return res.status(404).json({ 
        error: "No passages available",
        translation,
        language
      });
    }
    
    const randomOffset = Math.floor(Math.random() * totalCount);
    
    const passage = await BiblePassage.findOne({
      where: {
        translation: translation as string,
        language: language as string,
      },
      offset: randomOffset,
      order: [['id', 'ASC']],
    });
    
    res.json({ 
      passage,
      translation,
      language,
      type: 'random'
    });
  } catch (error) {
    next(error);
  }
});

export default router;