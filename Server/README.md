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
    "status": "Authenticated",
    "resposta": {
        "userID": 1,
        "login": "admin",
        "email": "admin@mail.com",
        "roleFK": 1
    }
}
se falha conexão com base de dados HTTP CODE 500
{ 
  STATUS: "NotAuthenticated"
  response:"Ocorreu um erro"
}
se os campos estiverem incorretos CODE 400 
{
    "status": "NotAuthenticated",
    "resposta": "Campos inválidos"
}

## GET /api/roles
### **recebe:**
### **devolve:**
se com sucesso HTTP CODE 200 OK
{
    "stat": "Authenticated",
    "resposta": [
        {
            "roleID": 1,
            "role": "Admin"
        },
        {
            "roleID": 2,
            "role": "Aluno"
        }
    ]
}

se falha conexão com base de dados 500 Internal Server Error
{
    "stat": "Authenticated",
    "resposta": {}
}
   
  
## GET /api/fichatecnica/create
### **recebe:**

 -designacao, -processoLCRM, -processoCEARC, -dataEntrada, -dataConclusao, -dataSaida, -coordenacao, 
 -direcaoTecnica, -localidade, -interessadoFK
 
### **devolve:** 
se com sucesso HTTP CODE 201 CREATED
   {
    "stat": "Registed",
    "resposta": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
se falha conexão com base de dados 

se os campos estiverem incorretos CODE 400   

## 
### **recebe:**
### **devolve:**

## 
### **recebe:**
### **devolve:**

## 
### **recebe:**
### **devolve:**


