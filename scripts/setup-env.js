const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to generate a random secret
function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Function to check if .env exists
function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  return fs.existsSync(envPath);
}

// Function to create .env file
function createEnvFile() {
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');

  if (!fs.existsSync(envExamplePath)) {
    console.error('Error: .env.example file not found');
    process.exit(1);
  }

  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  const envContent = envExample
    .replace('your-secret-key-here', generateSecret())
    .replace('postgres://default:password@ep-xxxx-xxxx.us-east-1.postgres.vercel-storage.com:5432/verceldb', '')
    .replace('https://your-vercel-app-url.vercel.app', '');

  fs.writeFileSync(envPath, envContent);
  console.log('Created .env file with default values');
  console.log('Please update the following values in your .env file:');
  console.log('1. DATABASE_URL - Your PostgreSQL connection string');
  console.log('2. NEXTAUTH_URL_PRODUCTION - Your production URL');
}

// Main function
function main() {
  if (checkEnvFile()) {
    console.log('.env file already exists');
    return;
  }

  createEnvFile();
}

main(); 