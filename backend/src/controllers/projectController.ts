import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendBadRequest } from '@/utils/response';

const prisma = new PrismaClient();

// 取得所有專案
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    sendSuccess(res, projects, 'Projects retrieved successfully');
  } catch (error) {
    console.error('Error fetching projects:', error);
    sendBadRequest(res, 'Failed to fetch projects');
  }
};

// 取得精選專案
export const getFeaturedProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredProjects = await prisma.project.findMany({
      where: {
        featured: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    sendSuccess(res, featuredProjects, 'Featured projects retrieved successfully');
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    sendBadRequest(res, 'Failed to fetch featured projects');
  }
}; 