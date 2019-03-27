#!/bin/bash

#Necessário fornecer permissões ao script exemplo: chmod 777 brandiB_update.sh
#./brandiB_update.sh

cd /home/operador/brandiB
sudo git pull

cd /home/operador/brandiB/Frontend/notes-app-client
sudo npm run build

sudo cp -avr /home/operador/brandiB/Frontend/notes-app-client/build/* /home/operador/brandiB_FE

pm2 reload login
sudo service nginx restart