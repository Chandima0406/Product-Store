# Product-Store
create backend and frontend
npm init -y
npm install express mongoos dotenv

create server inside backend
//add "type": "module", for package.json
{
    import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("server start at http://localhost:5000");
});
}


npm i nodemon -D
"dev": "nodemon backend/server.js"

.................................................
# dotenv environment variable files
.env
.env.*
!.env.example
....................................