# EatAdvisor

## 🥗 Description

EatAdvisor est une application mobile qui permet d'ajouter des aliments pour enregistrer un repas et connaître l'apport total en calories, lipides, glucides et protéines. L'application facilite le suivi nutritionnel grâce à l'intégration de l'API Edamam pour la recherche des aliments.

---

## 🚀 Installation

### Prérequis

Avant d'installer le projet, assure-toi d'avoir les outils suivants :

- [Node.js](https://nodejs.org/) installé
- [Expo](https://expo.dev/) installé globalement (`npm install -g expo-cli`)
- Un émulateur ou un appareil physique pour tester l'application

### Étapes d'installation

1. Clone ce dépôt :
   ```sh
   git clone https://github.com/cmelkebeek/EatAdvisor.git
   ```
2. Accède au dossier du projet :
   ```sh
   cd EatAdvisor
   ```
3. Installe les dépendances :
   ```sh
   npm install
   ```
4. Lance l'application :
   ```sh
   npx expo start
   ```
5. Scanne le QR code avec l'application Expo Go sur ton téléphone ou lance un simulateur Android/iOS.

---

## ⚙ Technologies utilisées

- [React Native](https://reactnative.dev/) avec [Expo](https://expo.dev/)
- [Tailwind CSS](https://tailwindcss.com/) pour le style
- [Clerk](https://clerk.dev/) pour l'authentification
- [Edamam API](https://developer.edamam.com/) pour la liste des produits et informations nutritionnelles

---

## 🏗 Structure du projet

```
/app
  /(auth)    # pages liés au module de connexion
  /(main)    # Écrans principaux
  /context   # Provider permettant la sauvegarde de certaines données à travers les pages
```

---

## 🔥 Fonctionnalités

✅ Ajout d'aliments à un repas 🥑  
✅ Calcul automatique des macronutriments (kcal, lipides, glucides, protéines) 🍽️  
✅ Authentification avec Clerk 🔐  
✅ Interface responsive avec Tailwind CSS 🎨  
✅ Recherche d'aliments via l'API Edamam 🔎  
✅ Sauvegarde des reaps avec le provider 💾

---

## 📞 Contact

👨‍💻 Développé par **[Camille Melkebeek](https://github.com/cmelkebeek)**  
📧 Contact : `camille.mbk@outlook.com`

