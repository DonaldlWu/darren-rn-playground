import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendNotFound, sendBadRequest } from '../utils/response';

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    
    if (isNaN(userId)) {
      sendBadRequest(res, 'Invalid user ID');
      return;
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        title: true,
        description: true,
        experience: true,
        workFrom: true,
        skills: true,
        email: true,
        avatar: true,
        backgroundImage: true,
        aboutMe: true,
        githubUrl: true,
        linkedinUrl: true,
        websiteUrl: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      sendNotFound(res, 'User not found');
      return;
    }
    
    sendSuccess(res, user, 'User data retrieved successfully');
  } catch (error) {
    console.error('Error fetching user:', error);
    sendNotFound(res, 'User not found');
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const updateData = req.body;
    
    if (isNaN(userId)) {
      sendBadRequest(res, 'Invalid user ID');
      return;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        title: true,
        description: true,
        experience: true,
        workFrom: true,
        skills: true,
        email: true,
        avatar: true,
        backgroundImage: true,
        aboutMe: true,
        githubUrl: true,
        linkedinUrl: true,
        websiteUrl: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    sendSuccess(res, updatedUser, 'User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    sendBadRequest(res, 'Failed to update user');
  }
}; 