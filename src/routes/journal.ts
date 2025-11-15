/**
 * AI-generated code by factory.ai Droid
 * Journal routes for EOTConnect - handles user spiritual journals and reflections
 */
import { Router } from "express";
import { Journal } from "../models";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// All journal routes require authentication
router.use(authenticateToken);

// Get user's journals
router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const { limit = 20, offset = 0, include_private = true } = req.query;
    
    const whereClause: any = { user_id: req.user!.id };
    
    // If include_private is false, only show public journals
    if (include_private === 'false') {
      whereClause.is_private = false;
    }

    const journals = await Journal.findAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      order: [['updatedAt', 'DESC']],
    });
    
    res.json({ journals, count: journals.length });
  } catch (error) {
    next(error);
  }
});

// Get specific journal entry
router.get("/:id", async (req: AuthRequest, res, next) => {
  try {
    const journal = await Journal.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user!.id 
      }
    });
    
    if (!journal) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    
    res.json({ journal });
  } catch (error) {
    next(error);
  }
});

// Create new journal entry
router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const { title, content, is_private = true } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const journal = await Journal.create({
      user_id: req.user!.id,
      title,
      content,
      is_private: Boolean(is_private),
    });

    res.status(201).json({ journal });
  } catch (error) {
    next(error);
  }
});

// Update journal entry
router.put("/:id", async (req: AuthRequest, res, next) => {
  try {
    const { title, content, is_private } = req.body;
    
    const journal = await Journal.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user!.id 
      }
    });
    
    if (!journal) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    // Update fields if provided
    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (is_private !== undefined) journal.is_private = Boolean(is_private);

    await journal.save();
    
    res.json({ journal });
  } catch (error) {
    next(error);
  }
});

// Delete journal entry
router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const journal = await Journal.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user!.id 
      }
    });
    
    if (!journal) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    await journal.destroy();
    
    res.json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Search user's journals
router.get("/search/:query", async (req: AuthRequest, res, next) => {
  try {
    const { query } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    
    const { Op } = require('sequelize');
    
    const journals = await Journal.findAll({
      where: {
        user_id: req.user!.id,
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } }
        ]
      },
      limit: Number(limit),
      offset: Number(offset),
      order: [['updatedAt', 'DESC']],
    });
    
    res.json({ journals, count: journals.length, query });
  } catch (error) {
    next(error);
  }
});

export default router;