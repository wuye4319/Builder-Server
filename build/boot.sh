#!/bin/sh
echo "${WORKSPACE}"
nodejs_dir='/data/pagedesignerserver'
cd ${WORKSPACE} && \cp -rp . /data/pagedesignerserver 
cd ${nodejs_dir} 
if [ -f ".git" ]; then
rm -rf .git
elif [ -f ".gitignore" ]; then
rm -rf  .gitignore 
fi
chmod -R 777 /data/pagedesignerserver/
npm install
npm run tsc 
npm restart