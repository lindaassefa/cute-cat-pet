#!/bin/bash

echo "🐱 Cute Cat Pet - Deployment Script"
echo "=================================="

# Check if required files exist
if [ ! -f "cute-cat-pet.html" ]; then
    echo "❌ Error: cute-cat-pet.html not found!"
    exit 1
fi

if [ ! -f "sw.js" ]; then
    echo "❌ Error: sw.js not found!"
    exit 1
fi

if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found!"
    exit 1
fi

echo "✅ All required files found!"

# Create deployment package
echo "📦 Creating deployment package..."

# Create a deployment directory
mkdir -p deploy
cp cute-cat-pet.html deploy/
cp sw.js deploy/
cp manifest.json deploy/
cp README.md deploy/

# Create icons directory if it doesn't exist
mkdir -p deploy/icons

echo "✅ Deployment package created in 'deploy/' directory"

# Check for optional icon files
if [ -d "icons" ]; then
    echo "📁 Icons directory found, copying icons..."
    cp -r icons/* deploy/icons/
    echo "✅ Icons copied to deploy/icons/"
else
    echo "⚠️  No icons directory found. Consider adding app icons for better PWA experience."
fi

echo ""
echo "🚀 Deployment Options:"
echo ""
echo "1. GitHub Pages:"
echo "   - Create a GitHub repository"
echo "   - Upload contents of 'deploy/' folder"
echo "   - Go to Settings > Pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'main' branch and '/ (root)' folder"
echo ""
echo "2. Netlify:"
echo "   - Go to netlify.com"
echo "   - Drag and drop the 'deploy/' folder"
echo "   - Your app will be live instantly!"
echo ""
echo "3. Vercel:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repository"
echo "   - Deploy automatically"
echo ""
echo "4. Firebase Hosting:"
echo "   - Install: npm install -g firebase-tools"
echo "   - Login: firebase login"
echo "   - Initialize: firebase init hosting"
echo "   - Deploy: firebase deploy"
echo ""
echo "5. Local Testing:"
echo "   - Install: npm install -g http-server"
echo "   - Run: cd deploy && http-server -p 8080"
echo "   - Open: http://localhost:8080"
echo ""
echo "📁 Files ready for deployment:"
ls -la deploy/
echo ""
echo "🎉 Your cat pet app is ready to deploy!" 