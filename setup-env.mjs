// Quick setup script to create .env file
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `# MongoDB Connection String - UPDATE THIS!
# Get your connection string from MongoDB Atlas: https://cloud.mongodb.com
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/cipherstudio?retryWrites=true&w=majority"

# JWT Secret - CHANGE THIS IN PRODUCTION!
# Generate a random secret: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="dev-secret-key-change-in-production-abc123xyz789"

# Server Port
PORT=5000
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Not overwriting.');
  console.log('   If you need to recreate it, delete .env first.');
  console.log('');
  console.log('📝 Make sure your .env has these variables:');
  console.log('   - DATABASE_URL (MongoDB connection string)');
  console.log('   - JWT_SECRET (random secret key)');
  console.log('   - PORT (default: 5000)');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file successfully!');
  console.log('');
  console.log('⚠️  IMPORTANT: Update DATABASE_URL in .env');
  console.log('   1. Get MongoDB connection from: https://cloud.mongodb.com');
  console.log('   2. Replace username, password, and cluster in .env');
  console.log('');
}

