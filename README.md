# WEBSOCKET-CRUD-HTML-NODE
1.crud-node-websocket-html (Modulos instalar)
archivo de configuracion

- archivo de configuracion
## 1-npm init --yes 
- nos ayudara a usar codigo ES6 ecma script 6  como dependencia de desarrollo
## 2-npm install @babel/node @babel/core @babel/preset-env @babel/cli -D   
- modulo que nos ayuda a actualizar el codigo al momento del desarrollo
## 3-npm install nodemon -D
- para levantar nuestro servidor
## 4-npm install express 
- para enviar y recibir los eventos mediante conexion de socket
## 5-npm install socket.io 
- identificador unico universal ===> id
## 6-npm install uuid 
- para otorgar animacion a los elementos creados 
## 7-https://animate.style/ 
- modulo ayuda a copiar los archivos para realizar build
## 8-npm install ncp 






# OBJERVACIONES 
- PACKAGE.JSON
  ### "scripts": {
    "dev": "nodemon src/index.js --exec babel-node --ignore src/public",
    "start": "node dist/index.js",
    "build": "babel src -d dist && ncp src/public/index.html dist/public/index.html && ncp src/public/main.css dist/public/main.css"
  },
