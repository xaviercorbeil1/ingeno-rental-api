# Simple Rental API

## Description



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
curl http://localhost:8080/rentals?min_nb_beds=2&min_price=40
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
