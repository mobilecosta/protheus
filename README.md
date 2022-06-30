<h2> Interface com operações em bases de dados relacionais </h2> 



Notas: 

App gateway-poui com json mockup

https://github.com/mobilecosta/gateway-poui/




Este projeto tem um mecanismo de login integrado as API's de segurança do Protheus (TOTVS), além disso fornece uma estrutura para listagem dos usuarios cadastrados na base do Protheus.

Implementações a serem feitas:

Criar um CRUD no cadastro de clientes
(INCLUIR, ALTERAR, APAGAR)

Podemos começar por aqui, com o passo a passo:

Obs.: IMPORTANTE - Verifique se ja tem instalado Angular nodejs/npm, o Angula precisa ser igual ou maior que v12 e o node precisa ser igual ou maior que 14 para seguir com os proximos passos.


#1 - Instale o NODE 
    
    No Linux você pode instalar de forma rapida com esse comando 
    Você pode tentar com as versões atuais mas caso apresente erros remova e instae do 0 como mostra no proximos passos 
      apt-get remove nodejs --purge.
      apt-get remove npm --purge.

    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        o 14.x refere a versão que você quer, você pode mudar para uma mais atual ou antiga.
           é necessário ter o curl instalado na sua maquina
           
Siga as as instruções dessse site:
  https://computingforgeeks.com/how-to-install-nodejs-on-ubuntu-debian-linux-mint/           
#2 - Instale o Angular =/> 12

#3- Siga as instruções no link a baixo: 
https://po-ui.io/guides/getting-started

![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--O2cjB-id--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/a3exuz06e9h212pandfr.png)

Deploy em
https://protheus-dev.herokuapp.com/login
https://protheus.vercel.app/
