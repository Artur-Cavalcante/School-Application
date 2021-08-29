const { Router } = require("express");

const routes = Router();

const {
  ProfessorController,
} = require("@/controllers/professor/professorController");
const { TituloController } = require("@/controllers/titulo/tituloController");
const {
  InstituicaoController,
} = require("@/controllers/instituicao/instituicaoController");
const { CursoController } = require("@/controllers/curso/cursoController");
const {
  TipoCursoController,
} = require("@/controllers/tipo-curso/tipoCursoController");
const {
  TipoDisciplinaController,
} = require("@/controllers/tipo-disciplina/tipoDisciplinaController");
const {
  DisciplinaController,
} = require("@/controllers/disciplina/disciplinaController");
const { AlunoController } = require("@/controllers/aluno/alunoController");
const { CursaController } = require("@/controllers/cursa/cursaController");
const {
  LecionaController,
} = require("@/controllers/leciona/lecionaController");

routes.get("/api/professor", ProfessorController.get);
routes.get("/api/professor/:id", ProfessorController.get);
routes.post("/api/professor", ProfessorController.post);
routes.put("/api/professor", ProfessorController.put);
routes.delete("/api/professor", ProfessorController.destroy);

routes.get("/api/titulo", TituloController.get);
routes.get("/api/titulo/:id", TituloController.get);
routes.post("/api/titulo", TituloController.post);
routes.put("/api/titulo", TituloController.put);
routes.delete("/api/titulo", TituloController.destroy);

routes.get("/api/instituicao", InstituicaoController.get);
routes.get("/api/instituicao/:id", InstituicaoController.get);
routes.get(
  "/api/cursoPorInstituicao",
  InstituicaoController.getQtdCursoPorInstituicao
);
routes.post("/api/instituicao", InstituicaoController.post);
routes.put("/api/instituicao", InstituicaoController.put);
routes.delete("/api/instituicao", InstituicaoController.destroy);

routes.get("/api/curso", CursoController.get);
routes.get("/api/curso/:id", CursoController.get);
routes.post("/api/curso", CursoController.post);
routes.put("/api/curso", CursoController.put);
routes.delete("/api/curso", CursoController.destroy);

routes.get("/api/tipo-curso", TipoCursoController.get);
routes.get("/api/tipo-curso/:id", TipoCursoController.get);
routes.post("/api/tipo-curso", TipoCursoController.post);
routes.put("/api/tipo-curso", TipoCursoController.put);
routes.delete("/api/tipo-curso", TipoCursoController.destroy);

routes.get("/api/tipo-disciplina", TipoDisciplinaController.get);
routes.get("/api/tipo-disciplina/:id", TipoDisciplinaController.get);
routes.post("/api/tipo-disciplina", TipoDisciplinaController.post);
routes.put("/api/tipo-disciplina", TipoDisciplinaController.put);
routes.delete("/api/tipo-disciplina", TipoDisciplinaController.destroy);

routes.get("/api/disciplina", DisciplinaController.get);
routes.get("/api/disciplina/:id", DisciplinaController.get);
routes.post("/api/disciplina", DisciplinaController.post);
routes.put("/api/disciplina", DisciplinaController.put);
routes.delete("/api/disciplina", DisciplinaController.destroy);

routes.get("/api/aluno", AlunoController.get);
routes.get("/api/aluno/:id", AlunoController.get);
routes.post("/api/aluno", AlunoController.post);
routes.put("/api/aluno", AlunoController.put);
routes.delete("/api/aluno", AlunoController.destroy);

routes.get("/api/leciona", LecionaController.get);
routes.get("/api/leciona/:id", LecionaController.get);
routes.post("/api/leciona", LecionaController.post);
routes.put("/api/leciona", LecionaController.put);
routes.delete("/api/leciona", LecionaController.destroy);

routes.get("/api/cursa", CursaController.get);
routes.get("/api/cursa/:id", CursaController.get);
routes.post("/api/cursa", CursaController.post);
routes.put("/api/cursa", CursaController.put);
routes.delete("/api/cursa", CursaController.destroy);

module.exports = { routes };
