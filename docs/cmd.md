#to update
npm i -g npm-check-updates
ncu -u
npm install

#rebuild
$(npm bin)/electron-rebuild
#rebuild on windows
.\node_modules\.bin\electron-rebuild.cmd
