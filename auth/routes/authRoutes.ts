import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { ApiResponse } from '../types/ApiResponse';
import { body, validationResult } from 'express-validator';
const router = Router();

router.post('/register',
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });
    }
    await register(req, res);
  }
);

router.post('/login', login);

// Contoh rute yang memerlukan autentikasi
router.get('/protected', protect, (req: Request, res: Response) => {
  const userId = (req as any).user;
  res.status(200).json(<ApiResponse<number>>{
    success: true,
    message: 'You have accessed a protected route',
    data: userId,
  });
});

export default router;
