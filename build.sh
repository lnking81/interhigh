#!/bin/bash

mkdir dist 2>/dev/null
rm dist/*

# Update build number
VERSION=$(grep -oP '"version": "\K\d+\.\d+\.\d+' src/manifest.json)
OLD_BUILD=$(grep -oP '"version": "\d+\.\d+\.\d+\.\K\d+' src/manifest.json)
NEW_BUILD=$((OLD_BUILD+1))
sed -i "s/$VERSION\.$OLD_BUILD/$VERSION.$NEW_BUILD/g" src/manifest.json
echo "Version updated $VERSION.$OLD_BUILD => $VERSION.$NEW_BUILD"

pushd src >/dev/null
zip -r ../dist/interhigh-extension.zip . -x "*.DS_Store" >/dev/null
EC=$?
popd >/dev/null

exit $EC
