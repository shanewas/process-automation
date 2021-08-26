#to update
npm i -g npm-check-updates
ncu -u
npm install

#rebuild
$(npm bin)/electron-rebuild
#rebuild on windows
.\node_modules\.bin\electron-rebuild.cmd


#git
0) check branch: git branch
1) create branch: git checkout -b "branch_Name"
1.1) git checkout girls/boys
2) merge branch: git merge <source> (if you are in branch)
3) pull request: 
4) fetch: git fetch remote <branchname> : <branchName> (remote: locally)
ref: https://medium.com/@topspinj/how-to-git-rebase-into-a-forked-repo-c9f05e821c8a

#git tutorial:
https://www.youtube.com/watch?v=SWYqp7iY_Tc

#Yarn on Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

$npm cache clean --force
$echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

$npm install --global windows-build-tools(admin)
$node-gyp configure
$npm config set node_gyp


$npm i node-gyp -g [node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.]


[Auto-detection fails for Visual C++ Build Tools 2015, so --msvs_version=2015 needs to be added]

$ node-gyp configure --msvs_version=2015
Note: The configure step looks for a binding.gyp file in the current directory to process. See below for instructions on creating a binding.gyp file.

Now you will have either a Makefile (on Unix platforms) or a vcxproj file (on Windows) in the build/ directory. Next, invoke the build command:

$ node-gyp build