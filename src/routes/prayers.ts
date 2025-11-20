/**
 * AI-generated code by factory.ai Droid
 * Prayer management routes for EOTConnect
 */
import { Router, Response, Request } from "express";
import { Prayer } from "../models";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Get all prayers (with optional filtering)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, language, page = 1, limit = 20 } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (category) where.category = category;
    if (language) where.language = language;

    const prayers = await Prayer.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["title", "ASC"]]
    });

    res.json({
      prayers: prayers.rows,
      totalCount: prayers.count,
      currentPage: Number(page),
      totalPages: Math.ceil(prayers.count / Number(limit))
    });

  } catch (error) {
    console.error("Get prayers error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get prayer by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const prayer = await Prayer.findByPk(id);
    if (!prayer) {
      return res.status(404).json({ error: "Prayer not found" });
    }

    res.json({ prayer });

  } catch (error) {
    console.error("Get prayer by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get prayers by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);

    const prayers = await Prayer.findAndCountAll({
      where: { category },
      limit: Number(limit),
      offset,
      order: [["title", "ASC"]]
    });

    res.json({
      prayers: prayers.rows,
      category,
      totalCount: prayers.count,
      currentPage: Number(page),
      totalPages: Math.ceil(prayers.count / Number(limit))
    });

  } catch (error) {
    console.error("Get prayers by category error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new prayer (authenticated users only)
router.post("/", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { title, text, language, category } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: "Title and text are required" });
    }

    const prayer = await Prayer.create({
      title,
      text,
      language: language || "english",
      category: category || "general"
    });

    res.status(201).json({
      message: "Prayer created successfully",
      prayer
    });

  } catch (error) {
    console.error("Create prayer error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update prayer (authenticated users only)
router.put("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, text, language, category } = req.body;

    const prayer = await Prayer.findByPk(id);
    if (!prayer) {
      return res.status(404).json({ error: "Prayer not found" });
    }

    // Update fields if provided
    if (title !== undefined) prayer.title = title;
    if (text !== undefined) prayer.text = text;
    if (language !== undefined) prayer.language = language;
    if (category !== undefined) prayer.category = category;

    await prayer.save();

    res.json({
      message: "Prayer updated successfully",
      prayer
    });

  } catch (error) {
    console.error("Update prayer error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete prayer (authenticated users only)
router.delete("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const prayer = await Prayer.findByPk(id);
    if (!prayer) {
      return res.status(404).json({ error: "Prayer not found" });
    }

    await prayer.destroy();

    res.json({ message: "Prayer deleted successfully" });

  } catch (error) {
    console.error("Delete prayer error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;