
import { Storage } from '@google-cloud/storage';

export const deleteImage = async (fileId: string) => {
    try {
      const storage = new Storage({
        projectId: 'lagi-361510',
        credentials: {
          "type": "service_account",
          "project_id": "lagi-361510",
          "private_key_id": "276b6fc08e212fbb568db26efac0d66b61fe2a85",
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWPfVM9VsmZ/Kg\nkdbmXN+N/KhKsM6uKHFxuMlULeNk5xJbC+BEG3eM0SvUWYHYLliFBF4jeNFZjKXy\nE9Ux6m3OYPy4iP+9zfuAmMsw2Rz7ps+J+F5JxWU9uJ9A/VMcsaXUMiBbbkcE/NM1\n8gvpIyNgqpiI00fVH2DC7zRHFWpUxj/PGBCtvmjz44PGzuIj2WPXHDEZj3p6DeHy\n83qN3UpR6H65ibKThXDw9IcaclAuPenzmNP+MPMpcInzSMdyQ2ybvxT7yZWvFths\n1C+gmCChQ375oK7M6gdMr0d7ErxAaFtx3QE3eLNvXUpHc1ntaam12dBdp7HeMwGg\n2PwMcAgTAgMBAAECggEABtp/jOEyc8WSgOl5bvAcpK2m8pC6Y97eVi17n0pCgnlT\n4H6+Q19/kQ0l8kqUuUYuRb8QheD5DXzO2DIjOVAPCDGZFAwp5jf/Kit5IIxpfXFm\nJTtBROngJbvQuGMCNCJItEOQPmyGMBYoaYrfL6uUl6SNcZ8UprA0x7egO//m4WRR\nK8bejkoacNAqijDVlm5Tgtdo8nX1/DTmBFJOKY5Qf8hGmQbATNZhTC/VGWnNj7x6\nq0FvCM/1p/JmzfPwI+XM2hKzXHTCB22CadXUhFuIdXeiTwc6NX/OvoAeSRJGZye3\ngwpncH4wC+C9wzUA2Pk6Xmg7iIJmHXQ9QVgX9RM2HQKBgQDxLKsueiB8mXN2K11t\naC047ogQr6sNWndDzc9GDQ+af+fjCQkV0F4RhUQIG1gzaTtB4mcPZVO5Mlhr+yOS\neSJRSTuaZT796OnPayQdbCfR2AtYvq5CY/kitmybIRn5y4bMfEVFLG2yVsmFr4la\ns7dAnQ+ASbRLsJz3MbQpi3aH5wKBgQDjaXT2kwZremrCZ+3KDexIEmkMV7WatdtW\nYS3qJ/j3q1JQMI0mTnUUAri0FWYRGnswX1THEf8N5UJlmoUM8RPT1+kUuwmGt6Pt\nTpYUgIGMJTdxrGGS9+2BVhv9tqT/F4PCRkFoC5OzHzJuNUd21VCPXHyowpLrHGL5\nVC0mXyFI9QKBgDUke5/lJ01tXsTWL2MRRo25+d97ZfyuR4N4UUkFTb/kmUsszYSy\nAlhn/iKvK9NAR99vrPf2gulXD6bTkvYOnSI+OdT+pE+8x/B9klqtX2Tc7zsh4TId\n52LfwbS5KYkicNSUOYtRi+Z1OzirAmArI6EoOqcxFnprM1tA54sUAQ1XAoGBAJlH\ngmOUM7aLu5uvS1JuUf0+E3oTQD+4Jc+yDq2OJbxhyEhugST5quZC81XGOpZ6n9+5\n0b2f/qbSCQ/Mt7NCZtfZ5qtnagNYkfAokPXeq/LXPuiqhNX3sCkF7jXzPoEFy3RN\nwFYtv27zLx2jYbjSDMukTg29oCNCbd+aAhij9B5lAoGBAOZoVq7+XZO6Ycz5T3w2\nEk3mpb6ZRHzzxr3WO/Zz7HDOXc4SIbm+3PCMhWF8PE9NhkEoN94KH0TmQtZWlwP2\nuHGIeVyeD73VkNEQv0Ph4bWMeMKevCZ4vCWvSPDsezFblWrNvDJFH5yhlpdbNtCh\nwr4JhC+Q+s44xFGSbz2pSS6Z\n-----END PRIVATE KEY-----\n",
          "client_email": "admin-827@lagi-361510.iam.gserviceaccount.com",
          "client_id": "117177056034406027670",
          // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          // "token_uri": "https://oauth2.googleapis.com/token",
          // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/admin-827%40lagi-361510.iam.gserviceaccount.com",
          "universe_domain": "googleapis.com"
        }
        
      });
  
      const bucket = storage.bucket('laginow');
      const file = bucket.file(fileId);
  
      // Delete the file from Google Cloud Storage
      await file.delete();
  
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };