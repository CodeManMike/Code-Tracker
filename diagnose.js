// Diagnostic script for GitHub Code Tracker
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('== GitHub Code Tracker Diagnostics ==');
console.log('Running diagnostic tests...\n');

// Check Node.js and npm versions
try {
  const nodeVersion = execSync('node --version').toString().trim();
  const npmVersion = execSync('npm --version').toString().trim();

  console.log(`Node.js version: ${nodeVersion}`);
  console.log(`npm version: ${npmVersion}`);

  // Check if Node.js version is adequate
  const versionNum = nodeVersion.replace('v', '').split('.').map(Number);
  if (versionNum[0] < 14) {
    console.log('⚠️ Warning: Node.js version should be 14 or higher');
  } else {
    console.log('✅ Node.js version is adequate');
  }
} catch (error) {
  console.log('❌ Error checking Node.js/npm versions:', error.message);
}

// Check if Yarn is installed
try {
  const yarnVersion = execSync('yarn --version').toString().trim();
  console.log(`Yarn version: ${yarnVersion}`);
  console.log('✅ Yarn is installed');
} catch (error) {
  console.log('❌ Yarn is not installed or not in PATH');
}

// Check if MongoDB is installed
try {
  const mongoVersion = execSync('mongod --version').toString().trim().split('\n')[0];
  console.log(`MongoDB: ${mongoVersion}`);
  console.log('✅ MongoDB is installed');
} catch (error) {
  console.log('❌ MongoDB is not installed or not in PATH');
}

// Check if Docker is installed
try {
  const dockerVersion = execSync('docker --version').toString().trim();
  const composeVersion = execSync('docker-compose --version').toString().trim();

  console.log(`Docker: ${dockerVersion}`);
  console.log(`Docker Compose: ${composeVersion}`);
  console.log('✅ Docker and Docker Compose are installed');
} catch (error) {
  console.log('❌ Docker and/or Docker Compose are not installed or not in PATH');
}

// Check project structure
console.log('\nChecking project structure:');

function checkDirectory(dir) {
  try {
    if (fs.existsSync(dir)) {
      console.log(`✅ ${dir} directory exists`);
      return true;
    } else {
      console.log(`❌ ${dir} directory is missing`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error checking ${dir} directory:`, error.message);
    return false;
  }
}

const backendExists = checkDirectory('./backend');
const frontendExists = checkDirectory('./frontend');

// Check backend files
if (backendExists) {
  console.log('\nChecking backend files:');

  // Check package.json
  if (fs.existsSync('./backend/package.json')) {
    console.log('✅ backend/package.json exists');

    // Check if it has required dependencies
    try {
      const packageJson = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
      const requiredDeps = ['express', 'mongoose', 'axios', 'jsonwebtoken', 'cors', 'dotenv'];

      const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
      if (missingDeps.length === 0) {
        console.log('✅ All required backend dependencies are listed in package.json');
      } else {
        console.log(`❌ Missing dependencies in package.json: ${missingDeps.join(', ')}`);
      }
    } catch (error) {
      console.log('❌ Error checking backend package.json:', error.message);
    }
  } else {
    console.log('❌ backend/package.json is missing');
  }

  // Check .env file
  if (fs.existsSync('./backend/.env')) {
    console.log('✅ backend/.env exists');

    // Check if it has required environment variables
    try {
      const envContent = fs.readFileSync('./backend/.env', 'utf8');
      const requiredVars = ['MONGO_URI', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'JWT_SECRET'];

      const missingVars = requiredVars.filter(variable => !envContent.includes(`${variable}=`));
      if (missingVars.length === 0) {
        console.log('✅ All required environment variables are defined in .env');
      } else {
        console.log(`❌ Missing environment variables in .env: ${missingVars.join(', ')}`);
      }
    } catch (error) {
      console.log('❌ Error checking backend .env file:', error.message);
    }
  } else {
    console.log('❌ backend/.env is missing');
  }

  // Check server.js
  if (fs.existsSync('./backend/server.js')) {
    console.log('✅ backend/server.js exists');
  } else {
    console.log('❌ backend/server.js is missing');
  }

  // Check models directory
  if (fs.existsSync('./backend/models')) {
    console.log('✅ backend/models directory exists');
  } else {
    console.log('❌ backend/models directory is missing');
  }

  // Check routes directory
  if (fs.existsSync('./backend/routes')) {
    console.log('✅ backend/routes directory exists');
  } else {
    console.log('❌ backend/routes directory is missing');
  }
}

// Check frontend files
if (frontendExists) {
  console.log('\nChecking frontend files:');

  // Check package.json
  if (fs.existsSync('./frontend/package.json')) {
    console.log('✅ frontend/package.json exists');

    // Check if it has required dependencies
    try {
      const packageJson = JSON.parse(fs.readFileSync('./frontend/package.json', 'utf8'));
      const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'axios', '@chakra-ui/react'];

      const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
      if (missingDeps.length === 0) {
        console.log('✅ All required frontend dependencies are listed in package.json');
      } else {
        console.log(`❌ Missing dependencies in package.json: ${missingDeps.join(', ')}`);
      }

      // Check if proxy is set correctly
      if (packageJson.proxy === 'http://localhost:5000') {
        console.log('✅ Proxy is correctly set to the backend server');
      } else {
        console.log('❌ Proxy is not set to http://localhost:5000');
      }
    } catch (error) {
      console.log('❌ Error checking frontend package.json:', error.message);
    }
  } else {
    console.log('❌ frontend/package.json is missing');
  }

  // Check src directory
  if (fs.existsSync('./frontend/src')) {
    console.log('✅ frontend/src directory exists');
  } else {
    console.log('❌ frontend/src directory is missing');
  }

  // Check App.js
  if (fs.existsSync('./frontend/src/App.js')) {
    console.log('✅ frontend/src/App.js exists');
  } else {
    console.log('❌ frontend/src/App.js is missing');
  }

  // Check components directory
  if (fs.existsSync('./frontend/src/components')) {
    console.log('✅ frontend/src/components directory exists');
  } else {
    console.log('❌ frontend/src/components directory is missing');
  }

  // Check pages directory
  if (fs.existsSync('./frontend/src/pages')) {
    console.log('✅ frontend/src/pages directory exists');
  } else {
    console.log('❌ frontend/src/pages directory is missing');
  }

  // Check context directory
  if (fs.existsSync('./frontend/src/context')) {
    console.log('✅ frontend/src/context directory exists');
  } else {
    console.log('❌ frontend/src/context directory is missing');
  }
}

// Check Docker files
console.log('\nChecking Docker files:');

if (fs.existsSync('./docker-compose.yml')) {
  console.log('✅ docker-compose.yml exists');
} else {
  console.log('❌ docker-compose.yml is missing');
}

if (fs.existsSync('./backend/Dockerfile')) {
  console.log('✅ backend/Dockerfile exists');
} else {
  console.log('❌ backend/Dockerfile is missing');
}

if (fs.existsSync('./frontend/Dockerfile')) {
  console.log('✅ frontend/Dockerfile exists');
} else {
  console.log('❌ frontend/Dockerfile is missing');
}

console.log('\nDiagnostic check complete. Review the results above to address any issues.');
console.log('See DEBUG_INSTRUCTIONS.md for detailed steps to run the application.\n');
