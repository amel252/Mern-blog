// si on veux créer une route , server  => on doit avoir express
// si on veux créer un model => on doit avoir mongoose
import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("Serveur ok sur le port 3000");
});
