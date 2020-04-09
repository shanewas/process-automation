TWO LOCAL BRANCH IN LOCAL:
$git checkout -b master
$git checkout -b working
$git branch
>master
>working*

TWO REMOTE ADDED:
$git remote add origin https://github.com/ferntechsolutions/aiwcore.git


RUN THIS AFTER SUCCESSFUL PUSH AND PULL REQUEST:
$git checkout working
$git pull origin alpha
$git branch

----------------------
1) change a file for specific functionality
2) add the file right away after changes done.
3) commit the file with proper commit msg.
4) work on nex specific funtionality
5) add & commit with proper msg again.
6) done with your work
------------------------

RUN this after satisfied with current feature work you assigned with: 
$git checkout master
$git pull origin alpha
$git merge working
$git push fork master
$git checkout working