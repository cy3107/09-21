#!/bin/bash

# Script to publish packages to private registry
echo "Publishing @wallet/libs and @wallet/hooks to private registry..."

# Build and publish libs package
echo "Building and publishing @wallet/libs..."
cd packages/libs
npm run build
npm publish --registry http://localhost:4873
cd ../..

# Build and publish hooks package
echo "Building and publishing @wallet/hooks..."
cd packages/hooks
npm run build
npm publish --registry http://localhost:4873
cd ../..

echo "Packages published successfully!"
echo ""
echo "Now you can install the packages in your SPA project:"
echo "cd apps/spa && npm install"