# AngularBeeV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 
    <project root>
    │
    ├── src
    │  │
    │  ├── app
    │  │  │
    │  │  ├── certifications                                           #Feature
    │  │  │  │
    │  │  │  ├── components                                            #Composant contenu dans les pages
    │  │  │  │  │ 
    │  │  │  │  ├── search-filters
    │  │  │  │  │   └── search-filters.component.css|html|spec.ts|ts
    │  │  │  │  │    
    │  │  │  ├── pages                                                 #Wrapper de l'application
    │  │  │  │  │                                         
    │  │  │  │  ├── certification-page                             
    │  │  │  │  │   └── certification.component.css|html|spec.ts|ts               
    │  │  │  │  │
    │  │  │  │  └── certifications-page                            
    │  │  │  │      └── certifications.component.css|html|spec.ts|ts   
    │  │  │  │                  
    │  │  │  ├─ certifications.ts                                      #Modèle de la feature 
    │  │  │  ├─ certifications-routing.module.ts                       #Route de la feature
    │  │  │  └─ certifications.module.ts                               #Module de la feature                                       
    │  │  │
    │  │  └── ...  
    │  └── ...
    └── ...

----     
    <project root>
    │
    ├── server
    │  │
    │  ├── config ------------------------------------------- #Fichier de config                                         
    │  │   └── search-filters.component.css|html|spec.ts|ts  
    │  │                  
    │  ├── controllers -------------------------------------- #Contrôleur de l'API
    │  │   │   
    │  │   └── api
    │  │       ├─ CertificationsController.js
    │  │       ├─ UserController.js
    │  │       ├─ TrainingController.js
    │  │       └── ...                   
    │  ├── models ------------------------------------------- #Modèle de l'API
    │  │   ├── config
    │  │   ├── migrations
    │  │   ├── models 
    │  │   ├── index.js
    │  │       ├── training.js 
    │  │       ├── user.js
    │  │       └── ...                   
    │  ├── routes ------------------------------------------- #Routes de l'API
    │  │   ├── api
    │  │   │   ├── certificationsRoute.js
    │  │   │   ├── index.js
    │  │   │   ├── trainingsRoute.js
    │  │   │   └── ...
    │  │   │                    
    │  │   ├── error.js
    │  │   └── index.js ------------------------------------ #Indique les routes du répertoire API       
    │  │                   
    │  └── index.js ---------------------------------------- #Point d'entrée de l'API
    │  │                  
    │  └── ... < src > 
    └── ...


----
* **@fileOverview** : Commentaire qui décrit le fichier entier. 
* **@author** : Se réfère à qui a ecrit l’entité documentée. 
* **@example** : Contient un code d’exemple illustrant comment l’entité doit être utilisée. 
* **@see** : Pointe vers une ressource liée. 
* **{@ link …}** : comme @see, mais peut être utilisé à l’intérieur d’un autre tag. 
* **@requires ressourceDescription** : Indique une ressource dont l’entité documentée à besoin. 
* **@module** : Indique le nom du module dans lequel on se trouve




----
*	**@function** : Indique que nous sommes dans une fonction
*	**@param** {paramType} paramName description : Décrit le paramètre dont le nom est paramName. Type et description sont optionnels. 
*	**@ returns** {returnType} description : Décrit la valeur retournée de la fonction ou de la méthode. 
*	**@description** : Description de la fonction
----



*	**@type** {typeName} : Type de la variable documentée. 
*	**@this** : Indique à quoi le mot clef « this » réfère.
*	**@constant** : Indique que la variable documentée a une valeur constante. 
*	**@property** {propType} propKey description : Documente la propriété d’un objet instancié
---

*	**@constructor** : Marque une fonction en tant que constructeur. 
*	**@class** : Marque une variable ou une fonction en tant que classe. 
*	**@constructs** : Enregistre qu'une méthode met en place des données d'instances. Si une telle méthode existe, la classe y est document ici.  
---

* **btb** = « cd /home/BeetoBee/ » (Répertoire où se trouve l’application)
* **restart** = « forever stopall && btb && forever start Web/bin/www » (redémarrer l’application)
*	**startall** = « btb && forever start Web/bin/www » (se placer dans le repertoire de l’application et démarrer l’application)
*	**update** = « forever stop all && btb && git pull && startall && cd .. && myadmin && btb » (mettre à jour l’application)
*	**myadmin** = « forever start /usr/lib/node_modules/express-admin/app.js /home/espress-admin/config »
*	**testWS** = « update && forever stopall && myadmin && node Web/bin/www
*	**stopapp** = « forever stopall »

---
*	**g** =  « git »
*	**gl** = « git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit » (Affichage git log stylisé et donc bien plus clair » 
*	**dracarys** = « git reset –hard && git clean -df » (revient au dernière modification depuis le dernier commit )
*	**ll** = « ls -lsha » (liste détaillée des fichiers)
*	**..** = « cd  ../ » 
*	**…** = « cd ../../ »
*	**….** = « cd ../../../ »
*	**…..** = « cd ../../../../ »


