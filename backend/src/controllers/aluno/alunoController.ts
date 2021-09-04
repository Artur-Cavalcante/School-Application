import { IAluno } from "@/interfaces/aluno/IAluno";
import { AlunoModel } from "@/models/aluno/alunoModel";
import { pagination } from "@/utils/pagination";
import { Request, RequestHandler, Response } from "express";
import { NonNullFindOptions } from "sequelize/types";

const get: RequestHandler = async (request: Request, response: Response) => {
  try {
    const start = request.query.start ? Number(request.query.start) : undefined;
    const length = request.query.length
      ? Number(request.query.length)
      : undefined;

    const parsedPagination: Omit<
      NonNullFindOptions<unknown>,
      "where"
    > = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const aluno = await AlunoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!aluno) return response.sendStatus(404);

      return response.status(200).json(aluno);
    } else {
      const alunos = await AlunoModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(alunos);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const aluno: IAluno = request.body;

    if (
      !aluno.id_aluno ||
      !aluno.tx_nome ||
      !aluno.tx_sexo ||
      !aluno.dt_nascimento
    ) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await AlunoModel.create({
      id_aluno: aluno.id_aluno,
      tx_nome: aluno.tx_nome,
      tx_sexo: aluno.tx_sexo,
      dt_nascimento: aluno.dt_nascimento,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const aluno: IAluno = request.body;

    if (
      !aluno.id_aluno ||
      !aluno.tx_nome ||
      !aluno.tx_sexo ||
      !aluno.dt_nascimento
    )
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const alunoExiste = await AlunoModel.findByPk(aluno.id_aluno);

    if (!alunoExiste)
      return response.status(404).json({ mensagem: "Aluno não existe" });

    await AlunoModel.update(
      {
        id_aluno: aluno.id_aluno,
        tx_nome: aluno.tx_nome,
        tx_sexo: aluno.tx_sexo,
        dt_nascimento: aluno.dt_nascimento,
      },
      { where: { id_aluno: aluno.id_aluno } }
    );

    return response.status(200).json(aluno);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const destroy: RequestHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.body.id;

    if (!id)
      return response
        .status(400)
        .json({ mensagem: "É necessário o id do Aluno" });

    const aluno = await AlunoModel.findByPk(id);

    if (!aluno) return response.status(404).json();

    await AlunoModel.destroy({
      where: {
        id_aluno: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const AlunoController = {
  get,
  destroy,
  post,
  put,
};

export { AlunoController };
