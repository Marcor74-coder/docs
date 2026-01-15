#!/bin/bash

# QuickLink Pro - One-Click Startup Script
# This script sets up and starts your URL shortener application

set -e  # Exit on error

echo "========================================"
echo "   QuickLink Pro - Starting Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Generate Prisma client and push database schema
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push
echo ""

# Start the application
echo "========================================"
echo "   ✨ Setup Complete!"
echo "========================================"
echo ""
echo "🚀 Starting QuickLink Pro..."
echo ""
echo "📍 Application will be available at:"
echo "   http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
