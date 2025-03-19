import { Request, Response } from 'express';
import Crop from '../models/Crop';
import { ICrop } from '../Types';
class CropController {
  static async getCrops(req: Request, res: Response) {
    try {
      const crops = await Crop.find();
      res.status(200).json(crops);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  static async createCrop(req: Request, res: Response) {
    try {
      const cropData: ICrop = req.body;

      const { name, variety, plantingDate, quantity, status } = cropData;

      if (!name || !variety || !plantingDate || !quantity || !status) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const newCrop = await Crop.create(cropData);
      res.status(201).json(newCrop);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async updateCrop(req: Request, res: Response) {
    try {
      const cropData: ICrop = req.body;
      const { name, variety, plantingDate, quantity, status } = cropData;
      const { id } = req.params;
      const crop = await Crop.findById(id);
      if (!crop) {
        return res.status(404).json({ message: 'Crop not found' });
      }

      if (!name && !variety && !plantingDate && !quantity && !status) {
        return res.status(400).json({ message: 'Atleast a field is required' });
      }

      const updatedCrop = await Crop.findByIdAndUpdate(id, cropData, {
        new: true,
      });

      if (updatedCrop) {
        return res.status(200).json({
          message: 'Crop updated successfully',
          updatedCrop,
        });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async deleteCrop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const crop = await Crop.findById(id);
      if (!crop) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      await Crop.findByIdAndDelete(id);
      res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default CropController;
