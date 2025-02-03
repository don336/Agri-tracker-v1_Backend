import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import { Request, Response } from 'express';

class UserController {
  static async Profiles(req: Request, res: Response): Promise<Response | void> {
    const users = await User.find();
    res.status(200).json({
      message: 'All Users',
      users,
    });
  }
  static async Profile(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({
        message: 'User ID is required',
      });
    }

    const user = await User.findOne({ userId: id });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User found',
      user,
    });
  }
  static async SignUp(req: Request, res: Response): Promise<Response | void> {
    const { firstName, email, lastName, phone, password } = req.body;

    if (!firstName || !email || !lastName || !phone || !password) {
      return res.status(422).json({
        message: 'All Fields are required',
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email has been taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);

    try {
      const createUser = {
        userId: uuidv4(),
        firstName,
        email,
        lastName,
        phone,
        password: encryptedPwd,
      };

      console.log(createUser);
      const user = await User.create(createUser);

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
          id: user.userId,
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
          userId: existingUser.userId,
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

      const { firstName, userId } = existingUser;

      return res.status(201).json({
        message: "You're logged in",
        accessToken,
        user: {
          userId,
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

  static async UpdateUser(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const { firstName, email, lastName, phone, password } = req.body;
    const { id } = req.params;

    const existingUser = await User.findOne({ userId: id });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (firstName && email && lastName && phone && password) {
      return res.status(422).json({ message: 'Atleast one field is required' });
    }

    let encryptedPwd;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      encryptedPwd = await bcrypt.hash(password, salt);
    }

    try {
      const user = await User.findOneAndUpdate(
        { userId: id },
        {
          firstName,
          email,
          lastName,
          phone,
          password: encryptedPwd, // hash the password before saving it to the database
        },
        {
          new: true,
        }
      );

      if (user) {
        return res.status(200).json({
          message: 'User updated successfully',
          user,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async DeleteUser(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const { id } = req.params;

    const existingUser = await User.findOne({ userId: id });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
      const user = await User.findOneAndDelete({ userId: id });

      if (user) {
        return res.status(200).json({
          message: 'User deleted successfully',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default UserController;
