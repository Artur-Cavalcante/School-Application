import { ILeciona } from "@/interfaces/leciona/ILeciona";
import { LecionaModel } from "@/models/leciona/lecionaModel";
import { ProfessorModel } from "@/models/professor/professorModel";
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

      const leciona = await LecionaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!leciona) return response.sendStatus(404);

      return response.status(200).json(leciona);
    } else {
      const lecionas = await LecionaModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(lecionas);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const leciona: ILeciona = request.body;

    if (!leciona.id_disciplina || !leciona.id_professor) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await LecionaModel.create({
      id_disciplina: leciona.id_disciplina,
      id_professor: leciona.id_professor,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const leciona: ILeciona = request.body;

    if (!leciona.id_disciplina || !leciona.id_professor)
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const lecionaExiste = await LecionaModel.findByPk(leciona.id_disciplina);

    if (!lecionaExiste)
      return response.status(404).json({ mensagem: "Leciona não existe" });

    await LecionaModel.update(
      {
        id_disciplina: leciona.id_disciplina,
        id_professor: leciona.id_professor,
      },
      { where: { id_disciplina: leciona.id_disciplina } }
    );

    return response.status(200).json(leciona);
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
        .json({ mensagem: "É necessário o id da tabela leciona" });

    const leciona = await LecionaModel.findByPk(id);

    if (!leciona) return response.status(404).json();

    await LecionaModel.destroy({
      where: {
        id_disciplina: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const LecionaController = {
  get,
  destroy,
  post,
  put,
};

export { LecionaController };
