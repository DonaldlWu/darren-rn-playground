import { Response } from 'express';
import { ApiResponse } from '@/types';

export const sendSuccess = <T>(
  res: Response, 
  data: T, 
  message: string = 'Success', 
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  };
  
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response, 
  error: string, 
  statusCode: number = 500
): void => {
  const response: ApiResponse<never> = {
    success: false,
    error
  };
  
  res.status(statusCode).json(response);
};

export const sendNotFound = (
  res: Response, 
  message: string = 'Resource not found'
): void => {
  sendError(res, message, 404);
};

export const sendBadRequest = (
  res: Response, 
  message: string = 'Bad request'
): void => {
  sendError(res, message, 400);
}; 