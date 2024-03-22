// import React from 'react';
// import axios from 'axios';

// const BackupButton: React.FC = () => {
//   const handleBackup = async () => {
//     try {
//       const response = await axios.get('/backup/backupdata');
//       console.log('Response:', response);
//       const data = response.data;
//       console.log('Backup Data:', data);
//       // Implement logic to handle the backup data on the frontend
//     } catch (error) {
//       console.error('Error during backup:', error);
//     }
//   };

//   return (
//     <button onClick={handleBackup}>
//       Backup Data
//     </button>
//   );
// };

// export default BackupButton;

import instance from "@/lib/axios";

export const handleBackup = async () => {
      try {
        const response = await instance('/backup/backupdata');
        console.log('Response:', response);
        const data = response.data;
        console.log('Backup Data:', data);
        // Implement logic to handle the backup data on the frontend
      } catch (error) {
        console.error('Error during backup:', error);
      }
    }