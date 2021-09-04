import { ITipoCurso } from "@/interfaces/tipo-curso/ITipoCurso";
import { TipoCursoModel } from "@/models/tipo-curso/tipoCursoModel";
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

      const tipoCurso = await TipoCursoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!tipoCurso) return response.sendStatus(404);

      return response.status(200).json(tipoCurso);
    } else {
      const tiposCurso = await TipoCursoModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(tiposCurso);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const tiposDoCurso: ITipoCurso = request.body;

    if (!tiposDoCurso.tx_descricao || !tiposDoCurso.id_tipo_curso) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await TipoCursoModel.create({
      id_tipo_curso: tiposDoCurso.id_tipo_curso,
      tx_descricao: tiposDoCurso.tx_descricao,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const tipoCurso: ITipoCurso = request.body;

    if (!tipoCurso.id_tipo_curso || !tipoCurso.tx_descricao)
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const tipoCursoExiste = await TipoCursoModel.findByPk(
      tipoCurso.id_tipo_curso
    );

    if (!tipoCursoExiste)
      return response.status(404).json({ mensagem: "Tipo Curso não existe" });

    await TipoCursoModel.update(
      {
        id_tipo_curso: tipoCurso.id_tipo_curso,
        tx_descricao: tipoCurso.tx_descricao,
      },
      { where: { id_tipo_curso: tipoCurso.id_tipo_curso } }
    );

    return response.status(200).json(tipoCurso);
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
        .json({ mensagem: "É necessário o id do Tipo do Curso" });

    const tipoDoCurso = await TipoCursoModel.findByPk(id);

    if (!tipoDoCurso) return response.status(404).json();

    await TipoCursoModel.destroy({
      where: {
        id_tipo_curso: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const TipoCursoController = {
  get,
  destroy,
  post,
  put,
};

export { TipoCursoController };
