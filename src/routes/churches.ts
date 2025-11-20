/**
 * AI-generated code by factory.ai Droid
 * Church directory routes for EOTConnect
 */
import { Router, Request, Response } from "express";
import { Church } from "../models";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Get all churches (with optional filtering and location search)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search, lat, lng, radius } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};

    // Text search in name, address, or description
    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const churches = await Church.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["name", "ASC"]]
    });

    // If location is provided, calculate distances (simplified)
    let churchesWithDistance = churches.rows;
    if (lat && lng && radius) {
      const userLat = Number(lat);
      const userLng = Number(lng);
      const searchRadius = Number(radius); // in km

      churchesWithDistance = churches.rows
        .map((church: any) => {
          if (church.latitude && church.longitude) {
            const distance = calculateDistance(
              userLat, userLng, 
              Number(church.latitude), Number(church.longitude)
            );
            return { ...church.toJSON(), distance };
          }
          return { ...church.toJSON(), distance: null };
        })
        .filter((church: any) => 
          church.distance === null || church.distance <= searchRadius
        )
        .sort((a: any, b: any) => {
          if (a.distance === null && b.distance === null) return 0;
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
    }

    res.json({
      churches: churchesWithDistance,
      totalCount: churches.count,
      currentPage: Number(page),
      totalPages: Math.ceil(churches.count / Number(limit))
    });

  } catch (error) {
    console.error("Get churches error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get church by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const church = await Church.findByPk(id);
    if (!church) {
      return res.status(404).json({ error: "Church not found" });
    }

    res.json({ church });

  } catch (error) {
    console.error("Get church by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search churches near location
router.get("/near/:lat/:lng", async (req: Request, res: Response) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 10, page = 1, limit = 20 } = req.query;
    
    const userLat = Number(lat);
    const userLng = Number(lng);
    const searchRadius = Number(radius); // in km
    
    // Get all churches with coordinates
    const churches = await Church.findAll({
      where: {
        latitude: { [require('sequelize').Op.ne]: null },
        longitude: { [require('sequelize').Op.ne]: null }
      }
    });

    // Calculate distances and filter
    const churchesWithDistance = churches
      .map((church: any) => {
        const distance = calculateDistance(
          userLat, userLng, 
          Number(church.latitude), Number(church.longitude)
        );
        return { ...church.toJSON(), distance };
      })
      .filter((church: any) => church.distance <= searchRadius)
      .sort((a: any, b: any) => a.distance - b.distance);

    // Apply pagination
    const offset = (Number(page) - 1) * Number(limit);
    const paginatedChurches = churchesWithDistance.slice(offset, offset + Number(limit));

    res.json({
      churches: paginatedChurches,
      totalCount: churchesWithDistance.length,
      currentPage: Number(page),
      totalPages: Math.ceil(churchesWithDistance.length / Number(limit)),
      searchLocation: { lat: userLat, lng: userLng },
      radius: searchRadius
    });

  } catch (error) {
    console.error("Get churches near location error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new church (authenticated users only)
router.post("/", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { 
      name, 
      address, 
      latitude, 
      longitude, 
      phone, 
      email, 
      website, 
      description 
    } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }

    const church = await Church.create({
      name,
      address,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      phone,
      email,
      website,
      description
    });

    res.status(201).json({
      message: "Church created successfully",
      church
    });

  } catch (error) {
    console.error("Create church error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update church (authenticated users only)
router.put("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      address, 
      latitude, 
      longitude, 
      phone, 
      email, 
      website, 
      description 
    } = req.body;

    const church = await Church.findByPk(id);
    if (!church) {
      return res.status(404).json({ error: "Church not found" });
    }

    // Update fields if provided
    if (name !== undefined) church.name = name;
    if (address !== undefined) church.address = address;
    if (latitude !== undefined) church.latitude = latitude !== null && latitude !== '' ? Number(latitude) : undefined;
    if (longitude !== undefined) church.longitude = longitude !== null && longitude !== '' ? Number(longitude) : undefined;
    if (phone !== undefined) church.phone = phone;
    if (email !== undefined) church.email = email;
    if (website !== undefined) church.website = website;
    if (description !== undefined) church.description = description;

    await church.save();

    res.json({
      message: "Church updated successfully",
      church
    });

  } catch (error) {
    console.error("Update church error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete church (authenticated users only)
router.delete("/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const church = await Church.findByPk(id);
    if (!church) {
      return res.status(404).json({ error: "Church not found" });
    }

    await church.destroy();

    res.json({ message: "Church deleted successfully" });

  } catch (error) {
    console.error("Delete church error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in kilometers
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export default router;