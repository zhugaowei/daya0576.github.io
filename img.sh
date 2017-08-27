#!/bin/bash

path1=~/Desktop/"`ls ~/Desktop | tail -n 1`"
path2=~/zblog/source/images/blog/"$1"
path2_dir="`echo $path2 | egrep -o '.*\/'`"
mkdir $path2_dir

echo -e "cp $path1 $path2"
cp -pir "$path1" "$path2" && echo done && echo $path2_dir
