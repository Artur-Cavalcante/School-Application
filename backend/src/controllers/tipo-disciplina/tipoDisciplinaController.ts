import { ITipoDisciplina } from "@/interfaces/tipo-disciplina/ITipoDisciplina";
import { TipoDisciplinaModel } from "@/models/tipo-disciplina/tipoDisciplinaModel";
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

      const tipoDisciplina = await TipoDisciplinaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!tipoDisciplina) return response.sendStatus(404);

      return response.status(200).json(tipoDisciplina);
    } else {
      const tiposDisciplina = await TipoDisciplinaModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(tiposDisciplina);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const tipoDisciplina: ITipoDisciplina = request.body;

    if (!tipoDisciplina.tx_descricao || !tipoDisciplina.id_tipo_disciplina) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await TipoDisciplinaModel.create({
      id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina,
      tx_descricao: tipoDisciplina.tx_descricao,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const tipoDisciplina: ITipoDisciplina = request.body;

    if (!tipoDisciplina.id_tipo_disciplina || !tipoDisciplina.tx_descricao)
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const tipoDisciplinaExiste = await TipoDisciplinaModel.findByPk(
      tipoDisciplina.id_tipo_disciplina
    );

    if (!tipoDisciplinaExiste)
      return response
        .status(404)
        .json({ mensagem: "Tipo Disciplina não existe" });

    await TipoDisciplinaModel.update(
      {
        id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina,
        tx_descricao: tipoDisciplina.tx_descricao,
      },
      { where: { id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina } }
    );

    return response.status(200).json(tipoDisciplina);
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
        .json({ mensagem: "É necessário o id do Tipo Disciplina" });

    const tipoDisciplina: ITipoDisciplina | null =
      await TipoDisciplinaModel.findByPk(id);

    if (!tipoDisciplina) return response.status(404).json();

    await TipoDisciplinaModel.destroy({
      where: {
        id_tipo_disciplina: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const TipoDisciplinaController = {
  get,
  destroy,
  post,
  put,
};

export { TipoDisciplinaController };
