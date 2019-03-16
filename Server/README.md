# my_brandi-a
## 1-Entrar na pasta "code" pela cmd
## 2- npm install - para instalar os módulos
## 3- node server.js - para iniciar o servidor
# Webservices da api
## GET /api/index
### **recebe:**
 -nada
### **devolve:** 
se com sucesso http code 200
{
  "status": "Authenticated"
  "response":{
              "userID":1
              "login":"Utilizador_Teste"
              "email":"Utilizador_Teste@ipt.pt"
             }
}
se sem sucesso 
{
  "status":"NotAuthenticated"
  "response":{}
}
## POST /auth/register
### **recebe:**
-login , -password, -email
### **devolve:**
se com sucesso HTTP CODE 201
{
  "status":"Registed"
  "response":"UserRegisted"
}
se houver campos repetidos devolve HTTP CODE 400
{
  "status":"FieldError"
  response:{}
}
se não houver conexão com a base de dados devolver HTTP CODE 500
{
  "status":"DatabaseError" -a alterar
  "response":{}
}
## POST /auth/login
### **recebe:**
- login , -password
### **devolve:**
se com sucesso HTTP CODE 200
{
  STATUS: "authenticated"
  response:{
    userID:1
    login:"utilizadorTeste"
    email"UtilizadorTeste@ipt.pt"
  }
}
se falha conexão com base de dados HTTP CODE 500
{ 
  STATUS: "NotAuthenticated"
  response:"Ocorreu um erro"
}
se os campos estiverem incorretos
{
  status:"NotAuthenticated"
  response:{}
}
