#!/bin/bash
npm run build
git checkout -B gh-pages
git add -f dist
git commit -am "Deploy to GitHub Pages"
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages
git checkout -