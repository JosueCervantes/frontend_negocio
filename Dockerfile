FROM node:22

#Directorio de trabajo
WORKDIR /app 

#Puerto para el servicio
EXPOSE 5173

#Comando para ejecutar el servicio 
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 