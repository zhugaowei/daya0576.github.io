#!/bin/bash --login

rvm use 1.9.3@octopress

rake isolate\[$1\]

rake generate; rake preview; rake integrate
