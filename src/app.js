import { openDb } from './configDB.js';
import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from './Controller/Pessoa.js';

import express from 'express';
const app = express();
app.use(express.json());

createTable();

app.get('/', function(req, res){
    res.send("Olá Mundo!");
});

app.get('/pessoas', async function(req, res){
    let pessoas = await selectPessoas();
    res.json(pessoas);
});

app.get('/pessoa', async function(req, res){
    let pessoa = await selectPessoa(req.body.id);
    res.json(pessoa);
});

app.post('/pessoa', function(req, res) {
    insertPessoa(req.body);
    res.json({
        "statusCode": 200
    });
});

app.put('/pessoa', function(req, res) {
    if(req.body && !req.body.id){
        res.json({
            "statusCode": 400,
            "msg": "Você precisa usar um id"
        });
    } else {
        updatePessoa(req.body)
        res.json({
            "statusCode": 200
        });
    }
   
});

app.delete('/pessoa', async function(req, res){
    let pessoa = await deletePessoa(req.body.id);
    res.json(pessoa);
});

app.listen(3000, () => console.log("Api rodando..."))