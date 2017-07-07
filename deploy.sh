#!/bin/sh

rvm use 1.9.3
 
sudo systemsetup -settimezone Australia/Sydney
# sudo timedatectl set-timezone Australia/Sydney

rake generate; rake deploy

# sudo timedatectl set-timezone Asia/Shanghai
sudo systemsetup -settimezone Asia/Shanghai
