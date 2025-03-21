# WattWise

Unicorn Internship.

## Check out the app

There is a live version of the app hosted on my domain. You can check it out [here](https://unicorn-internship.multiverse-project.com/).

> [!NOTE]
> You can use the following credentials to login to the app:
>
> - Email: `test@test.com`
> - Password: `123123`

## Description

This is my submission for the Unicorn Internship. The app is a simple CRUD application that allows user to view list of electricity providers.
This app is complete with its own dashboard and user authentication system. The app is built using the MERN stack.

## Tech Stack

The app is built using the classic MERN stack, which is:

- MongoDB
- Express
- React
- Node

## Setting Up

### Local Development

1. Clone repository

```
git clone https://github.com/Kotyarishka/unicorn-internship.git
```

2. Install dependencies of the frontend

```
cd frontend
npm install
```

3. Install dependencies of the backend

```
cd backend
npm install
```

4. Create a `.env` file for backend and frontend folowing the `.env.example` files in the respective folders.
5. Start the backend

```
cd backend
npm run dev
```

6. Start the frontend

```
cd frontend
npm run dev
```

Visit `http://localhost:5173/` to see the app.

### Production

1. Clone repository

```
git clone https://github.com/Kotyarishka/unicorn-internship.git
```

2. Install dependencies of the frontend

```
cd frontend
npm install
```

3. Install dependencies of the backend

```
cd backend
npm install
```

4. Make sure to setup the `.env` files for both frontend and backend. You can follow the `.env.example` files in the respective folders. Make sure to set `APP_ORIGIN` env variable to your domain.
5. Build the frontend

```
cd frontend
npm run build
```

> [!IMPORTANT]
> You will need to rebuild the frontend every time you make changes to env. 6. Build the backend

```
cd backend
npm run build
```

7. Start the backend

```
cd backend
npm start
```

> [!IMPORTANT]
> You will need to rebuild the backend every time you make changes to env. 6. Build the backend

8. Visit your domain to see the app.
