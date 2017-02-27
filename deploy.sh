#!/bin/sh

sudo timedatectl set-timezone Australia/Sydney

rake generate; rake deploy

sudo timedatectl set-timezone Asia/Shanghai
