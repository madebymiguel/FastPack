# FastPack

## Setup

To set up the server locally, run the following:

For client:

```shell
npm i && npm start
```

For server:

```shell
npm i && npm run dev
```

If you are having windows issue like me use:

```shell
npm i && made dev
```

## Built With

- React
- TypeScript
- React Router Dom
- Chakra UI
- Express
- Mongoose
- jsonwebtoken
- bcryptjs
- cookie

## Live Demo

A live demo is currently being hosted on Render.com

- [FrontEnd](https://fastpack.onrender.com/)
- [BackEnd](https://fastpack-api.onrender.com/)

## Features include:

- Signup and login pages/routes. Token saved in cookie.
- In header you are able to logoff and navigate to the different pages. (Inventory and PackList)
- Inventory page you are able create an inventory item and perform other CRUD opertions.
- PackList page you are able to see and navigate to created lists. Also are able to create new pack list.
- New Pack List page you have all of the inventory items you created available. Clicking on items creates starts the new list creation. You can see weight breakdown (base, consumable, worn and total). You can toggle your prefer units (oz, lb, g, kg). Naming and saving takes you back to PackList page.
- In PackList page clicking a link takes you to the Packlist you created with its items and weight breakdown.
