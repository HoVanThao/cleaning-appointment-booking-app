import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải ít nhất 6 ký tự'),
];

export const loginValidation = [
  body('email').notEmpty().withMessage('Email không được để trống'),
  body('password').notEmpty().withMessage('Password không được để trống'),
];
