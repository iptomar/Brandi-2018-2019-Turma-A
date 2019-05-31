#!/bin/csh
# --- Atualizar Servidor PSI ---
echo "------->A iniciar atualização"
echo " "
echo "------->A ligar ao repositório GIT"
echo " "
git clone https://github.com/iptomar/Brandi-2018-2019-Turma-A.git
rm -R -f master
mv Brandi-2018-2019-Turma-A master
echo " "
echo "------->Editar o ficheriro server.js"
echo " "
cd master/Server/code
nano server.js
echo " "
echo "------------>A instalar Dependências"
echo " "
cd ..
npm install
cd ..
cd Client
npm install
npm audit fix
echo " "
echo "------->A compilar código"
echo " "
npm run build
cd ..
echo " "
echo "------->A reiniciar serviços"
echo " "
pm2 restart server --update-env
pm2 restart app --update-env
echo " "
echo "------->Fim atualização"
echo " "



#mysql 
#source /home/operador/brandi-A/master/BasedeDados/base_dados.sql
#exit