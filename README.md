# VMS 


Desenho da arquitetura do sistema

![Alt text](/imgs/desenho.png "desenho sistema")


## Guia de instalação API/Backend

Foi utilizado a versão do **Python 3.10** e testado com **Python 3.9.5** 

No diretório do backend irá ser encontrado o arquivo [requirements.txt](/back/requirements.txt) com as dependências.  

No diretório back executar os seguintes comandos
### Criar env
```bash
python -m venv venv 
```
No GNU/Linux 
```bash
source venv/bin/activate 
```
No Windows 
```bash
venv\Scripts\activate
```
Instalar dependências 
```bash
pip install -r requirements.txt
```
executar as migrations
```bash
python manage.py migrate 
```
Criar super user
```bash
python manage.py createsuperuser
```
executar servidor

```bash
python manage.py runserver 0.0.0.0:8000
```
A aplicação estará ouvindo nos seguintes hosts.

Foi definido **http://localhost:8000** para o front acessar.

Obs. veja a arquivo [.env](front/.env) no diretório front

**http://127.0.0.1:8000**

**http://ip.da.maquina:8000**

### **[cross-origin](https://pypi.org/project/django-cors-headers/)**

Caso queria mudar ou add o ip em [CORS_ALLOWED_ORIGINS](/back/core/settings.py) no arquivo [settings.py](/back/core/settings.py).  

Obs. Por motivos de teste a browsable Api e o debug está ativo.

### Acesso a documentação da API
**http://localhost:8000/api/docs/**

![Alt text](/imgs/documentacao.png "desenho sistema")

Disclamer: foi utilizado o https://pypi.org/project/drf-yasg/ para geração automática de um schema Swagger/OpenAPI 2.0. Por motivo de teste está permitido AllowAny 

**Obs** toda conta de usuário criado precisa ser ativo pelo admin: 

**http://localhost:8000/api/admin/user/user/**


## Guia de instalação WebApp/Front
Foi utilizado a versão do **node 16** e testado com **node 17** 

No diretório do front irá ser encontrado o arquivo [package.json](/front/package.json) com as dependências.  

No diretório front executar os seguintes comandos
### Instalar dependências
```bash
yarn 
```
ou 

```bash
npm install 
```

```bash
yarn run start 
```

A aplicação estará disponível em http://localhost:3000

![Alt text](/imgs/telalogin.png "tela de login do sistema")

Obs. Em caso de erro verifique se o host que o back está ouvindo é o mesmo que está em [.env](front/.env).


**Obs**Toda conta de usuário criada precisa ser ativada pelo admin.

No diretório do front no arquivo [README.md](/front/[README.md) tem mais informações sobre a execução do front readme gerado automaticamente via Create React App.

Em caso de erro ou dúvidas email me [email](mailto:jackwgoulart@gmail.com)
