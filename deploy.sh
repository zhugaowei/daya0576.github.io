#!/bin/sh

sudo systemsetup -settimezone Australia/Sydney
# sudo timedatectl set-timezone Australia/Sydney

rake generate
rake deploy

# sudo timedatectl set-timezone Asia/Shanghai
sudo systemsetup -settimezone Asia/Shanghai
