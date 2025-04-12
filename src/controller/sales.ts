import { Request, Response } from 'express';
import Sales from '../models/Sales';
import { v4 as uuidv4 } from 'uuid';
import { ISales } from '../Types';

class SalesController {
  static async getSales(req: Request, res: Response) {
    try {
      const sales = await Sales.find();
      if (sales.length > 0) {
        res.status(200).json({
          message: 'Sales',
          sales,
        });
      } else {
        res.status(404).json({
          message: 'No Sales Found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        error,
      });
    }
  }

  static async getSale(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sale = await Sales.findById({ _id: id });

      if (!sale) {
        res.status(404).json({
          message: 'Sale Not Found',
        });
      }

      res.status(200).json({
        message: 'Sale Found',
        sale,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  static async postSale(req: Request, res: Response) {
    const salesData: ISales = req.body;

    const {
      crop_name,
      customer_contact,
      customer_name,
      unit_price,
      total_price,
      payment_method,
      notes,
      quantity,
      sale_date,
    } = salesData;

    try {
      if (
        !crop_name ||
        !customer_contact ||
        !customer_name ||
        !unit_price ||
        !total_price ||
        !payment_method ||
        !notes ||
        !quantity ||
        !sale_date
      ) {
        res.status(400).json({
          message: 'All fields are required',
        });
      }

      const sale = await Sales.create({
        _id: uuidv4(),
        crop_name,
        customer_contact,
        customer_name,
        unit_price,
        total_price,
        payment_method,
        notes,
        quantity,
        sale_date,
      });

      res.status(201).json({
        message: 'Sale Added Successfully',
        sale,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        error,
      });
    }
  }

  static async updateSale(req: Request, res: Response) {
    const { id } = req.params;
    const salesData: ISales = req.body;

    const {
      crop_name,
      customer_contact,
      customer_name,
      unit_price,
      total_price,
      payment_method,
      notes,
      quantity,
      sale_date,
    } = salesData;

    try {
      if (
        !crop_name &&
        !customer_contact &&
        !customer_name &&
        !unit_price &&
        !total_price &&
        !payment_method &&
        !notes &&
        !quantity &&
        !sale_date
      ) {
        res.status(400).json({
          message: 'At least one field is required',
        });
      }

      const updatedSale = await Sales.findByIdAndUpdate(
        { _id: id },
        {
          crop_name,
          customer_contact,
          customer_name,
          unit_price,
          total_price,
          payment_method,
          notes,
          quantity,
          sale_date,
        },
        { new: true }
      );

      if (!updatedSale) {
        res.status(404).json({ message: 'Sale Not Found' });
      }

      res.status(200).json({
        message: 'Sale Updated Successfully',
        updatedSale,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }

  static async deleteSale(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sale = await Sales.findById({ _id: id });

      if (!sale) {
        res.status(404).json({
          message: 'Sale Not Found',
        });
      }

      await Sales.findOneAndDelete({ _id: id });

      res.status(200).json({ message: 'Sale Deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
}

export default SalesController;
