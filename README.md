# Poker9

## A simple Pokédex app

Poker9 is a simple app created to test some technologies.
It uses Typescript (the JS superset), HTML and CSS to build a simple and
colorful pokédex with nice UI.

## The API

This app uses the [PokéAPI](https://pokeapi.co/) application to fetch the
pokémon data.

## Project Structure

```
+-- src
| +-- js
| | +-- index.js - Compiled JS file (using TSC).
| +-- styles
| | +-- cards.css - Style of the pokémon cards.
| | +-- loading.css - Loading animation and styles.
| | +-- search-pokemon.css - WIP: Search input styles.
| | +-- select-pokemon.css - Page title styles.
| | +-- styles.css - Page main styles.
| | +-- types.css - Style for any of the pokémon types.
| +-- index.ts - Main script file as and TS file.
+-- index.html - Application main page.
+-- package.json - Project settings
+-- README.md - README documentation file.
+-- tsconfig.json - JSON file with the TS configurations.
```
