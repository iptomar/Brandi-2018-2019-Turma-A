# my_brandi-a
## 1-Entrar na pasta "code" pela cmd
## 2- npm install - para instalar os módulos
## 3- node server.js - para iniciar o servidor
# Webservices da api
> Basta clicar na imagem para visualizar o que as rotas retornam
# Utilizadores

## Get /api/users :heavy_check_mark:

<details>
  
  <summary> Click me </summary>
  
  # **recebe**
   > Nada
  # **devolve**
  ## -Sucess :white_check_mark:
  <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GETUsers/getAllusers_sucess.PNG)

  </details>
  
  ## -DB down :x:
  
  <details> 
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GETUsers/getAllUsers_dbDown.PNG)

  </details>
 </details>
 
# ---------------------------------------------- 
##  Get /api/users/:id :heavy_check_mark: 

<details>
  
  <summary>Click me</summary>
  
   # **recebe** 
    > id
  # **devolve:**
  ## -Sucess :white_check_mark:
  <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GetSingleUser/getSingleUserDetails_Authenticated.PNG)
    
  </details>

  ## -Unsuccess :x:
  ### --DBDown
  
  <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GetSingleUser/DBDown.PNG)
    
  </details>
  

  ### --NotAuthenticated
  <details>
  
 ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GetSingleUser/NotAuthenticated.PNG)
 
  </details>
 
  ### --diferentID
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/GetSingleUser/getSingleUserDetails_Authenticated_ID_diferente.PNG)
 
  </details>
  


 </details>

# ----------------------------------------------
## Post /auth/login :heavy_check_mark:
 
<details>
  
  <summary> Click me </summary>
  
  # **recebe**
  > login , password
  # **devolve**
  ## -Sucess :white_check_mark:
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/Login/LoginSucess.PNG)
 
  </details>
  
  
 
  ## -Unsucess :x:
  ### --Login not valid
  
  <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/Login/LoginNotValid.PNG)
 
  </details>
  
  

  ### --DB Down
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/Login/NoDatabaseConnection.PNG)
   
  </details>

</details>

# ----------------------------------------------
## Post /auth/register :heavy_check_mark:

<details>
  
  <summary> Click me </summary>
  
  # **recebe**
  > login,password,email,roleFK
  # **devolve**
  ## -Sucess :white_check_mark:
  
   <details>

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/RegisterUser/registerUser_authenticated_sucess.PNG)
   
  </details>

  ## -Unsucess :x:
  ### --Field Error
  
  <details>

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/RegisterUser/registerUser_authenticated_emailNotValid.PNG)
   
  </details>
  
  ### --Not Authenticated
  
   <details>

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/RegisterUser/registerUser_Notauthenticated.PNG)
   
  </details>
  
 
  ### --No Permissions
  
 <details>

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/RegisterUser/registerUser_NoPermissions.PNG)
   
  </details>
  
  
  

  ### --DB Down
  
  
   <details>

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/RegisterUser/NoDatabaseConnection.PNG)
   
  </details>
  
 </details>

# ----------------------------------------------
## Post /api/users/:id/edit :heavy_check_mark:

<details> 
    
  <summary> Click me </summary>
  
  # **recebe**
  >id,login,email,roleFK
  # **devolve**
  ## -Sucess :white_check_mark:
  
  <details>

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/changeUser/Sucess_Authenticated.PNG)
  
  </details>
  
  

  ## -Unsucess :x:
  ### --No Permission
  
  <details>

   
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/changeUser/NotAuthorized.PNG)
  
  </details>

  ### --Not Authenticated
  
  <details>

   

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/changeUser/NotAuthenticated.PNG)
  
  </details>

  
  
  
  ### --Duplicate Inputs
  
  
   <details>

   

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/utilizadores/changeUser/DuplicateInputs.PNG)
  
  </details>

  

  
 </details>

# ----------------------------------------------
# Tecnicos

 ## Get /api/tecnicos :heavy_check_mark:
 
 <details> 
    
  <summary> Click me </summary>
  
  # **recebe**
  > nada
  # **devolve**
  ## -Sucess :white_check_mark:
  
  <details>

   

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getAll/getTecnicos.PNG)
  
  </details>
  
  
  
  ## -Unsucess :x:
  ### -no Token
  
   <details>

   

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getAll/noToken.PNG)
  
  </details>
  
  

  ### -db Down
  
   <details>

   

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getAll/dbDown.PNG)
  
  </details>
  


 </details>
 
 # ----------------------------------------------
 ## Get /api/tecnicos/:id :heavy_check_mark:
 
<details>
  
  <summary>Click me</summary>
  
  # **recebe**
  > nada
  # **devolve**
  ## -Sucess :white_check_mark:
  
  <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getTecnicoID/Sucess.PNG)
  
  </details>
  
  
  
  ## -Unsucess :x:
  ### --DB Down
  
   <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getTecnicoID/DBDown.PNG)
  
  </details>
  

  ### --No Token
  
   <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/getTecnicoID/NoToken.PNG)
  
  </details>
  


</details>

# ----------------------------------------------
## Post /api/tecnicos/:id/edit :heavy_check_mark:

<details>

  <summary> Click me </summary>
    
  # **recebe**
  > nome , habilitacoes , nivelProfissional
  # **devolve**
  ## -Sucess :white_check_mark:
  
   <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/updateTecnico/Update.PNG)
  
  </details>
  

  ## -Unsucess :x:
  ### --Erro Campo
  
   <details>
  
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/updateTecnico/erro%20campo.PNG)
  
  </details>
  
 
  ### --DB Down
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/updateTecnico/DBDown.PNG)
  
  </details>
  

  ### --Not Authenticated
  
  <details>
  

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/updateTecnico/NotAuthenticated.PNG)
  
  </details>
  
   
  </details>
 
 # ----------------------------------------------
 ## Post /api/tecnicos/create :heavy_check_mark:
  
<details>
 
  <summary> Click me </summary>
   
  # **recebe**
  > nome , habilitacoes , nivelProfissional , userFK
  # **devolve**
  ## -Sucess :white_check_mark:
  
  <details>
  

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/createTecnico/Sucess.PNG)
  
  </details>
  

  ## -Unsucess :x:
  ### --Field Error
  
  <details>
  

  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/createTecnico/FieldError.PNG)
  
  </details>
  
   
  ### --No Token
  
  <details>
  

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/createTecnico/NoToken.PNG)
  
  </details>
  
 
  ### --FK Error
  
  <details>
 
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/createTecnico/FKError.PNG)
  
  </details>
  
  ### --DB Down
  
  <details>
 
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/tecnicos/createTecnico/DBDown.PNG)
  
  </details>
</details>

# ----------------------------------------------
# Fichas Registo Identificação
##   Get /api/fichaRegistoIdentificacao :heavy_check_mark:

 <details>
 
  <summary> Click me </summary>
  
  # **recebe**
  > nada
  # **devolve**
  ## -Sucess :white_check_mark:
  
  <details>
 
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/getAllFichas/Authenticated_Sucess.PNG)
  
  </details>

  ## -Unsucess :x:
  ### --No Token
  
  <details>
 
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/getAllFichas/NotAuthenticated.PNG)
  
  </details>
  
  ### --ficha nao existente
  
  <details>

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/getAllFichas/ficha-nao-existente.PNG)
  
  </details>
  
  ### --DB Down
  
  <details>

   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/getAllFichas/DBDown.PNG)
  
  </details>  
</details>

# ----------------------------------------------
##  POST /api/fichaRegistoIdentificacao/create :heavy_check_mark:

<details>
 
  <summary>Click me</summary>
  
  # **recebe**
  > visible , designacao , processoLCRM , processoCEARC , dataEntrada , dataConclusao , coordenacao , direcaoTecnica , interessadoFK , dataEntrega, array de tecnicos
  # **devolve**
  ## -Sucess :white_check_mark:
  
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/Registed.PNG)
  
  </details>  
  
  

  ## -Unsucess :x:
  ### --No Token
  
  <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/noToken.PNG)
  
  </details>  
  
  
 
  ### --Error datas
  
   <details>
  
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/error%20datas.PNG)
  
  </details>  

  ### --DB Down
  
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/dbDown.PNG)
  
  </details>  

   ### --Error foreignkey interesados
   
   <details>
 
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/erro%20foreign%20key%20interessado.PNG)
   
  </details>  


   ### --Error foreignkey processos
   
 <details>
 
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/create%20ficha/foreign%20key%20processos.PNG)
   
  </details>  
   

  
</details>

# ----------------------------------------------
## POST /api/fichaRegistoIdentificacao/:id/edit :heavy_check_mark:

<details>
 
  <summary>Click me</summary>
  
   # **recebe**
  > id,visible , designacao , processoLCRM , processoCEARC , dataEntrada , dataConclusao , coordenacao , direcaoTecnica , interessadoFK , dataEntrega, array de tecnicos
  # **devolve**
  ## -Sucess :white_check_mark:
  
   <details>
 
  ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/updateFicha/Updated.PNG)
  
  </details>  
  
  

  ## -Unsucess :x:
  ### --No Token
  
   <details>
 
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/updateFicha/NoToken.PNG)
  
  </details> 
  

  ### --Erro num dos Campos
  
    
   <details>
  
   ![alt text](https://raw.githubusercontent.com/iptomar/Brandi-2018-2019-Turma-A/master/Server/postman_screenshots/fichaRegistoIdentificacao/updateFicha/Erro%20num%20dos%20campos.PNG)
  
  </details>
  ### --DB Down
  
   <details>
  
   ![alt text](https://github.com/iptomar/Brandi-2018-2019-Turma-A/blob/master/Server/postman_screenshots/fichaRegistoIdentificacao/updateFicha/DBDown.PNG)
     
  </details> 
</details>  
