const axios = require('axios');

const userData = {
  name: "Darren Wu",
  title: "Senior iOS Developer",
  description: "走偏的 iOS 工程師",
  experience: 7, // 2024 - 2017 = 7 years
  workFrom: 2017, // 開始工作年份
  skills: [
    "swift",
    "iOS",
    "Xcode",
    "React Native"
  ],
  email: "deirenwu1101@gmail.com",
  avatar: "https://cvws.icloud-content.com/S/ATbXRrHpcNA81VyB22KqMDxnZ-Pa/IMG_8746.JPG?o=AmF_9_UWd-l5wVja4Ow2bzOVUwCjKxxsZPwYJRdONyt8&v=1&z=https%3A%2F%2Fp161-content.icloud.com%3A443&x=1&a=CAogqltW3YcXYnOIG6KZFQ-v0NdlMJZqxUmfWGjPq-ctIVsSZxCIuveY-TIYiNGKnvkyIgEAUgRnZ-PaaiYXy1QAdIVGCImDJ1WWovRRNhihF99Xbc5Ni_liWpKejcmG5kUVQ3Imq9Qa3u02ZKEyouWEu1TUw7Ky2e6FgYBVNpzsSx0sS2p7TzU4Nw0&e=1750530697&r=a8196434-6ffe-4adc-8c21-5d3603896929-2&s=j_lDjNNoZuQY5yurphgfLGx1D_Y",
  backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  aboutMe: "從 iOS 開始探索軟體開發世界，慢慢接觸不同的開發技術。",
  githubUrl: "https://github.com/DonaldlWu",
  linkedinUrl: "https://www.linkedin.com/in/%E5%BE%97%E4%BA%BA-%E5%90%B3-43171a11b/",
  websiteUrl: "https://pose-coach.com/about",
  location: "Taipei, Taiwan"
};

async function updateUserProfile() {
  try {
    console.log('Updating user profile...');
    console.log('User data:', JSON.stringify(userData, null, 2));
    
    // Update user with ID 1 (assuming this is the main user)
    const response = await axios.put('http://localhost:3001/api/v1/users/1', userData);
    
    console.log('✅ User profile updated successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Error updating user profile:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

updateUserProfile(); 