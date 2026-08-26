#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

push_addr=`git@github.com:rulego/rulego-doc.git` # git提交地址
commit_info=`git describe --all --always --long`
dist_path=docs/.vitepress/dist # 打包生成的文件夹路径
push_branch=gh-pages # 推送的分支

# 生成静态文件（含 postbuild：语言切换缺页重定向桩等）
npm run docs:build

# 进入生成的文件夹
cd $dist_path

git config  user.name "rulego-team"
git config  user.email "rulego@outlook.com"

git init
git add -A
git commit -m "deploy, $commit_info"
git push -f $push_addr HEAD:$push_branch

cd -
rm -rf $dist_path
