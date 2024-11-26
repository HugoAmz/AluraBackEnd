// Importa o framework Express para criar a aplicação web
import express from "express";

// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras de posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

// Configura o armazenamento de arquivos usando Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Define 'uploads/' como o diretório de destino
  },
  // Define como os arquivos serão nomeados
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Mantém o nome original do arquivo
  }
});

// Cria um middleware de upload de arquivo único usando o armazenamento configurado
const upload = multer({ storage: storage }).single('imagem');  // Especifica 'imagem' como o nome do campo de upload

// Define as rotas da API
const routes = (app) => {
  // Permite que a API interprete requisições com corpo em formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para listar todos os posts (método GET)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (método POST)
  app.post("/posts", postarNovoPost);

  // Rota para realizar upload de imagem (método POST)
  // Utiliza o middleware 'upload' para processar o arquivo antes de chamar a função 'uploadImagem'
  app.post("/upload", upload, uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função 'routes' para ser utilizada em outro arquivo
export default routes;