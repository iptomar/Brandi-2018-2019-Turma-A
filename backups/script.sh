#!/bin/bash

############ OBJETIVOS ############
# MYSQL
# Node.js
# Fazer pull do git (backoffice e frontoffice) 
#  e correr em 2 serviços separados do node
###################################

#Dependecias
sudo yum -y update
sudo yum install -y yum-utils
sudo yum install -y wget
sudo yum install -y bzip2

###############################
############ MYSQL ############
###############################
wget http://repo.mysql.com/mysql80-community-release-el7-1.noarch.rpm -O mysql.rpm
sudo rpm -ivh mysql.rpm
sudo yum install -y mysql-server
sudo systemctl start mysqld

#mostra qual a password temporária do root para inserir em mysql_secure_installation
sudo grep 'temporary password' /var/log/mysqld.log | rev | cut -f1 -d ' ' | rev
echo 'Inserir esta password no script seguinte: SUMOL + COMPAL.lata33'
mysql_secure_installation

#################################
############ Node.js ############
#################################
# Através de Node Version Manager (NVM)

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

# Permite correr o nvm sem reiniciar a máquina
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

source ~/.bash_profile

nvm install v8.11.3
nvm use v8.11.3
nvm alias default v8.11.3

#atualiza o npm para a versão mais recente
npm i npm@latest -g

npm install pm2 -g
################################
############ GitHub ############
################################

sudo yum install -y git

sudo git clone https://github.com/iptomar/Brandi-Frontend.git /Brandi/Brandi-Frontend
sudo git clone https://github.com/iptomar/Brandi-Backend.git /Brandi/Brandi-Backend
sudo chmod 757 Brandi -R

################################
############ Apache ############
################################

yum install -y httpd

sudo cp /etc/httpd/conf/httpd.conf /httpd.conf.backup

sudo cat <<EOF >/etc/httpd/conf.d/default-site.conf
<VirtualHost *:80>
    ProxyPreserveHost On

    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/
</VirtualHost>
EOF


################Manual conf#################################

# Necessario para que o Backend funcione
#mysql -u user -p 
#create database Brandi_BD;
mysql -u root "-pSUMOL + COMPAL.lata33" -e "CREATE DATABASE Brandi_BD"

#Verificar link para que seja possivem usar npm sem sudo e
# para que se possa instalar os ficheiros necessários
#http://www.competa.com/blog/how-to-run-npm-without-sudo/

cd /Brandi/Brandi-Backend
npm install
npm install jquery

cd /Brandi/Brandi-Frontend
npm install
npm install passport
npm install connect-flashp

sudo env PATH=$PATH:/usr/local/bin pm2 startup -u root

pm2 start /Brandi/Brandi-Backend/main.js
pm2 start npm -- start

# https://www.digitalocean.com/community/tutorials/iptables-essentials-common-firewall-rules-and-commands
#sudo iptables -A INPUT -p tcp --dport 80 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
#sudo iptables -A INPUT -p tcp --dport 8080 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
#sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
#sudo iptables -A OUTPUT -p tcp --sport 80 -m conntrack --ctstate ESTABLISHED -j ACCEPT

#sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
#sudo iptables --policy INPUT DROP

#sudo iptables -A INPUT -p tcp --syn --dport 80 -m connlimit --connlimit-above 15 --connlimit-mask 32 -j REJECT --reject-with tcp-reset 


#o mysql cria uma password temporária para o root
#antes de correr o script de segurança tem que se ter conhecimento da password temporária
#sudo grep 'temporary password' /var/log/mysqld.log | rev | cut -f1 -d ' ' | rev
#mysql -u root "-pSUMOL + COMPAL.lata33" -e "CREATE DATABASE Brandi_BD"


#mysql_secure_installation

#Apache Probs (503 error on view)
# sudo /usr/sbin/setsebool -P httpd_can_network_connect 1

#Testings
#

