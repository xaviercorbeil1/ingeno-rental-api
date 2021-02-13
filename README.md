# Évaluation Technique

## Énoncé

L'objectif de ce test est d'évaluer vos aptitudes techniques dans leur ensemble en vous demandant de produire une API HTTP REST.

Vous avez ci-joint le fichier `rentals.csv` qui contient les données nécessaires.

> Il n'est pas nécessaire de vous intégrer avec quelconque service externe.

Votre API doit implanter la(es) ressource(s) HTTP REST nécessaire(s) afin de pouvoir servir les fonctionnalités suivantes:

- Retourner l'ensemble des informations sur une propriété à louer.

```
curl http://localhost:8080/rentals/{id}
{
    "postalcode": "G3A0G4",
    "city": "montreal",
    "description": "a very cool description",
    "price": 57,
    "owner": "Harry Potter",
    "nb_beds": 2,
    "nb_baths": 1,
    "rating": 4
}
```

- Retourner les informations de base sur toutes les propriétés à louer.

```
curl http://localhost:8080/rentals
[
    {
        "id": "guid are terrible ids",
        "postalcode": "G3A0G4",
        "price": 57,
        "nb_beds": 2,
        "rating": 4
    },
    ...
]
```

- Appliquer un filtre pour retirer les propriétés qui ont moins de X lits
  > min_nb_beds=2
- Appliquer un filtre pour retirer les propriétés qui ne respectent pas le masque de code postal. Les `_` sont en fait des espaces réservés qui permettent d'égaler n'importe quelle lettre ou chiffre.
  > postalcode=G3A\_\_4
        - conservera G3A0G4 et G3A2Y4
        - filtrera G3A0G1 et G2A0G4
- Appliquer un filtre pour retirer les propriétés dont le prix de location par nuit est inférieur à X\$.
  > min_price=40
- Appliquer un filtre pour retirer les propriétés dont le prix de location par nuit est supérieur à X\$.
  > max_price=40
- Pouvoir appliquer un ou plusieurs des filtres cités plus haut dans une même requête.

## Choix technologiques

- Nous vous demandons d'utiliser un des langages de programmation du portefeuille technogique standard d'Ingeno:
  - Java (Jersey)
  - Node.js (Express)
  - Python (Flask)
  - Go (Standard)
- Vous êtes libre d'utiliser toute librairie qui vous semble pertinente à la réalisation de la tâche.
- Vous êtes libre d'utiliser l'architecture qui vous semble la mieux adaptée.

## Points Importants

- N'hésitez pas à produire un README.md pour vous assurer que nous pouvons comprendre vos hypothèses et décisions. Il est de votre responsabilité de clarifier les points qui ne sont pas évidents en nous posant des questions.
- Il n'est pas primordial d'implémenter toutes les fonctionnalités, l'important est d'en faire le plus possible avec le temps alloué. La qualité est plus importante à nos yeux que la quantité.

## Évaluation

- Nous nous attendons que les règles de l'art du génie logiciel seront respectées.
- Critères d'évaluation
  - Le respect des besoins du client
  - L'architecture de la solution
  - La bonne utilisation des concepts du paradigme de programmation choisi
  - Les tests automatisés
  - Les standards de qualité du Clean Code

## Livraison

Nous vous demandons de partager votre travail dans un repo publique GitHub.
