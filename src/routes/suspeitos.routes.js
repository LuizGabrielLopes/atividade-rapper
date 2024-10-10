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
    if (!Number.isInteger(idade)) {
        return res.status(400).send({
            message: "A idade deve ser um número inteiro"
        })
    }

    if (!nome || !idade || !envolvimento) {
        return res.status(400).send({
            message: "Os campos nome, idade e envolvimento são obrigatórios"
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

//Rota para buscar um elemento específico do array suspeitos pelo id
suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params

    const suspeito = suspeitos.find((suspect) =>
        suspect.id === Number(id));

    console.log(suspeito);

    if (!suspeito) {
        return res.status(404).send({ message: "Suspeito não encontrado!" });
    }

    return res.status(200).send(suspeito);
});


// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, idade, descricao, envolvimento } = req.body;
  
    // Busca um suspeito pelo id no array de suspeitos
    const suspeito = suspeitos.find((suspect) => suspect.id == id);
  
    // Validação dos campos obrigatórios
    if (!nome || !idade || !envolvimento) {
        return res.status(400).send({
            message: "Os campos nome, idade e envolvimento são obrigatórios"
        })
    }
  
    // Validação de existência do envolvimento
    if (envolvimento != "sim" && envolvimento != "não") {
      return res.status(400).send({
        message: "Digite 'sim' ou 'não'!",
      });
    }
  
    suspeito.nome = nome;
    suspeito.idade = idade;
    suspeito.descricao = descricao;
    suspeito.envolvimento = envolvimento;
  
    return res.status(200).json({
      message: "Suspeito atualizado com sucesso!",
      suspeito,
    });
  });

    // Rota para deletar um suspeito
suspeitosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    // Busca um suspeito pelo id no array de suspeitos
    const suspeito = suspeitos.find((suspect) => suspect.id == id);
  
    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
      return res
        .status(404)
        .json({ message: `Suspeito com id ${id} não encontrado!` });
    }
  
    // Remove o suspeito do array de suspeitos
    suspeitos = suspeitos.filter((suspect) => suspect.id != id);
  
    return res.status(200).json({
      message: "Suspeito removido com sucesso!",
      suspeito,
    });
  });

export default suspeitosRoutes;
