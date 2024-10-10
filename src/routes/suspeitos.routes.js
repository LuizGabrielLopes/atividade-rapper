import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        nome: "P.Diddy",
        idade: 54,
        descricao: [
            "negro",
            "1,78m",
            "tatuado",
            "tem barba"
        ],
        envolvimento: "sim",
    },
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        nome: "Justin Bieber",
        idade: 30,
        descricao: [
            "branco",
            "1,75m",
            "tatuado",
            "nao tem barba"
        ],
        envolvimento: "não",
    },
    {
        id: Number(Math.floor(Math.random() * 99) +1),
        nome: "Tupac Shakur",
        idade: 30,
        descricao: [
            "negro",
            "1,76m",
            "tatuado",
            "nao tem barba"
        ],
        envolvimento: "sim",
    }
];

//Rota para buscar todos os elementos do array suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).send({ suspeitos })
});

//Rota para criar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, idade, descricao, envolvimento } = req.body;
    if (!nome || !Number.isInteger(idade)) {
        return res.status(400).json({
            message: "O nome é obrigatório e a idade deve ser um número inteiro"
        })
    }

    if (envolvimento != "sim" && envolvimento != "não") {
        return res.status(400).send({
            message: "Digite sim ou não"
        })
    }

    const novoSuspeito = {
        id: Number(Math.floor(Math.random() * 100)),
        nome,
        idade,
        descricao,
        envolvimento,
    }
    suspeitos.push(novoSuspeito)
    return res.status(201).send({ suspeitos })
});

export default suspeitosRoutes;
