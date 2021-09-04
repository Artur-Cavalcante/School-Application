import { ICurso } from "@/interfaces/curso/ICurso";
import { CursoModel } from "@/models/curso/cursoModel";
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

      const curso = await CursoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!curso) return response.sendStatus(404);

      return response.status(200).json(curso);
    } else {
      const cursos = await CursoModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(cursos);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const curso: ICurso = request.body;

    if (!curso.id_instituicao || !curso.id_tipo_curso || !curso.tx_descricao) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatorios faltantes" });
    }

    await CursoModel.create({
      id_curso: curso.id_curso,
      id_instituicao: curso.id_instituicao,
      id_tipo_curso: curso.id_tipo_curso,
      tx_descricao: curso.tx_descricao,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const curso: ICurso = request.body;

    if (
      !curso.id_curso ||
      !curso.id_instituicao ||
      !curso.id_tipo_curso ||
      !curso.tx_descricao
    )
      return response.status(400).json({
        mensagem: "Campos obrigatorios faltantes",
      });

    const cursoExiste = await CursoModel.findByPk(curso.id_curso);

    if (!cursoExiste)
      return response.status(404).json({ mensagem: "Curso não existe" });

    await CursoModel.update(
      {
        id_curso: curso.id_curso,
        id_instituicao: curso.id_instituicao,
        id_tipo_curso: curso.id_tipo_curso,
        tx_descricao: curso.tx_descricao,
      },
      { where: { id_curso: curso.id_curso } }
    );

    return response.sendStatus(200);
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
        .json({ mensagem: "É necessário o id do curso" });

    const curso = await CursoModel.findByPk(id);

    if (!curso) return response.status(404).json();

    await CursoModel.destroy({
      where: {
        id_curso: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const CursoController = {
  get,
  destroy,
  post,
  put,
};

export { CursoController };
