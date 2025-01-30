import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import { Request, Response } from 'express';

class UserController {
  static async SignUp(req: Request, res: Response): Promise<Response | void> {
    const { firstName, email, lastName, phone, password } = req.body;
    console.log(req.body, '=========>');
    // if (firstName || email || lastName || phone || password) {
    //   return res.status(422).json({
    //     message: 'All Fields are required',
    //   });
    // }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email has been taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({
        userId: uuidv4,
        firstName,
        email,
        lastName,
        phone,
        password: encryptedPwd,
      });

      const accessToken = await Jwt.sign(
        {
          userId: user.userId,
          firstName: user.firstName,
          email: user.email,
          lastName: user.lastName,
          phone: user.phone,
          password,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          lastName: user.lastName,
          phone: user.phone,
        },
        accessToken,
      });
    } catch (error) {
      console.error('Error during registration:', error);

      // Handle server errors
      return res.status(500).json({
        message:
          'An error occurred during registration. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async SignIn(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json('All Fields are required');
    }
    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({
          message: 'User not Found try registering',
        });
      }

      const passVerif = bcrypt.compare(password, existingUser.password);

      if (!passVerif) {
        return res.status(401).json({ message: 'User Authentication Failed!' });
      }

      const accessToken = await Jwt.sign(
        {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          email: existingUser.email,
          lastName: existingUser.lastName,
          phone: existingUser.phone,
        },
        process.env.JWT_SECRET as string
      );

      res.cookie('token', accessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      const { firstName } = existingUser;

      return res.status(201).json({
        message: "You're logged in",
        accessToken,
        user: {
          firstName,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  }
}

export default UserController;
