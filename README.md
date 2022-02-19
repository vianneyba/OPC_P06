Cette application permet de d'afficher des informations de films récuperes a partir d'une API django rest.


#### Affichage du film avec la meilleur IMDB
La premier section affiche le film avec la meilleur note imbd fournit par l'API


#### Affichage des meilleurs films IMDB
La seconde section affiche les 4 films ayant reçu les meilleurs notes sur IMDB. il est possible d'affiché les trois autres films reçu par l'API grâce aux flêches précédent ou suivante.


#### Affichage d'autres catégories
Les 3 sections suivantes affiche les 4 films pour 3 catégories (7 films sont recu par l'application, 4 sont affiché et 3 sont affichable en cliquant sur les fléches).

### Configuration.
Configuration de l'adresse de l'API:

__const url_base = "http://127.0.0.1/";__


Il est possible de modifier les catégories affichés en modifiant ce tableau.

__const genres = ["Thriller", "Adventure", "Romance"];__

Il est possible de modifier le nombre d'image visible (4 par défaut) et le nombre de films reçu par l'API (7 par défaut)

__const options = {'visible': 4, 'nbr_movie': 7};__

Il est possible d'ajouter plus de catégorie visible en copiant dans *index.html* la section suivante

```
<section class='carousel'>
<h1></h1>
<div class="carousel_img">
  <button class="carousel__btn_previous">&#9664</button>
  <div class="carousel__cover"></div>
  <button class="carousel__btn_next">&#9654</button>
</div>
</section>
```

et en ajoutant un type ou plus dans le tableau __const genres__

il est aussi possible de suprimer le tableau __const genres__ et dans ce cas il aura une requête a l'API pour la récupération des genres et en choisir de maniére aléatoire pour compléter la ou les `<section class='carousel'>`