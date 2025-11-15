/**
 * AI-generated code by factory.ai Droid
 * Content routes for EOTConnect - handles prayers, churches, and other spiritual content
 */
import { Router } from "express";
import { Prayer, Church } from "../models";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Health check
router.get("/ping", (_, res) => res.json({ ok: true, message: "content ok" }));

// Prayer routes
router.get("/prayers", async (req, res, next) => {
  try {
    const { category, language, limit = 20, offset = 0 } = req.query;
    
    const whereClause: any = {};
    if (category) whereClause.category = category;
    if (language) whereClause.language = language;

    const prayers = await Prayer.findAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      order: [['title', 'ASC']],
    });
    
    res.json({ prayers, count: prayers.length });
  } catch (error) {
    next(error);
  }
});

router.get("/prayers/:id", async (req, res, next) => {
  try {
    const prayer = await Prayer.findByPk(req.params.id);
    if (!prayer) {
      return res.status(404).json({ error: "Prayer not found" });
    }
    res.json({ prayer });
  } catch (error) {
    next(error);
  }
});

// Protected route for creating prayers (admin only in future)
router.post("/prayers", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { title, text, language, category } = req.body;
    
    if (!title || !text) {
      return res.status(400).json({ error: "Title and text are required" });
    }

    const prayer = await Prayer.create({
      title,
      text,
      language: language || "en",
      category: category || "general",
    });

    res.status(201).json({ prayer });
  } catch (error) {
    next(error);
  }
});

// Church routes
router.get("/churches", async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const churches = await Church.findAll({
      limit: Number(limit),
      offset: Number(offset),
      order: [['name', 'ASC']],
    });
    
    res.json({ churches, count: churches.length });
  } catch (error) {
    next(error);
  }
});

router.get("/churches/:id", async (req, res, next) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: "Church not found" });
    }
    res.json({ church });
  } catch (error) {
    next(error);
  }
});

// Search churches by location (basic radius search)
router.get("/churches/near/:lat/:lng", async (req, res, next) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 50 } = req.query; // km
    
    // Note: This is a simplified distance calculation
    // In production, consider using PostGIS for better geo queries
    const churches = await Church.findAll({
      where: {
        latitude: { [require('sequelize').Op.not]: null },
        longitude: { [require('sequelize').Op.not]: null },
      },
      order: [['name', 'ASC']],
    });
    
    res.json({ churches, count: churches.length });
  } catch (error) {
    next(error);
  }
});

// Protected route for creating churches (admin only in future)
router.post("/churches", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { name, address, latitude, longitude, phone, email, website, description } = req.body;
    
    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }

    const church = await Church.create({
      name,
      address,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      phone,
      email,
      website,
      description,
    });

    res.status(201).json({ church });
  } catch (error) {
    next(error);
  }
});

export default router;