# WEBSOCKET-CRUD-HTML-NODE
1.crud-node-websocket-html (Modulos instalar)
archivo de configuracion


## 1-npm init --yes     //archivo de configuracion
## 2-npm install @babel/node @babel/core @babel/preset-env @babel/cli -D   //nos ayudara a usar codigo ES6 ecma script 6  como dependencia de desarrollo
## 3-npm install nodemon -D //modulo que nos ayuda a actualizar el codigo al momento del desarrollo
## 4-npm install express //para levantar nuestro servidor
## 5-npm install socket.io //para enviar y recibir los eventos mediante conexion de socket
## 6-npm install uuid //identificador unico universal ===> id
## 7-https://animate.style/ //para otorgar animacion a los elementos creados 
## 8-npm install ncp //modulo ayuda a copiar los archivos para realizar build






#OBJERVACIONES 
## -PACKAGE.JSON
  ### "scripts": {
    "dev": "nodemon src/index.js --exec babel-node --ignore src/public",
    "start": "node dist/index.js",
    "build": "babel src -d dist && ncp src/public/index.html dist/public/index.html && ncp src/public/main.css dist/public/main.css"
  },
