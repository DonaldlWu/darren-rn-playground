const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addWorkFromField() {
  try {
    console.log('Adding workFrom field to user...');
    
    // Update user with ID 1 to add workFrom field
    const updatedUser = await prisma.user.update({
      where: { id: 1 },
      data: {
        workFrom: 2017
      }
    });
    
    console.log('✅ User updated successfully!');
    console.log('Updated user:', updatedUser);
  } catch (error) {
    console.error('❌ Error updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addWorkFromField(); 