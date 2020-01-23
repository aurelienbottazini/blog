#!/usr/bin/env sh
grunt
bundle exec jekyll build

cd ~/projects/blog-public
git add .
git commit --no-verify -m "publish"
git push
cd -
