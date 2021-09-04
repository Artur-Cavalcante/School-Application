import { ITitulo } from "@/interfaces/titulo/ITitulo";
import { TituloModel } from "@/models/titulo/tituloModel";
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

      const titulo = await TituloModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!titulo) return response.sendStatus(404);

      return response.status(200).json(titulo);
    } else {
      const titulos = await TituloModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(titulos);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const titulo: ITitulo = request.body;

    if (!titulo.tx_descricao) {
      return response
        .status(400)
        .json({ mensagem: "Campo tx_descrição é obrigatorio" });
    }

    await TituloModel.create({
      tx_descricao: titulo.tx_descricao,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const titulo: ITitulo = request.body;

    if (!titulo.id_titulo || !titulo.tx_descricao)
      return response
        .status(400)
        .json({ mensagem: "É necessário o campo id_titulo e tx_descricao" });

    const tituloExiste = await TituloModel.findByPk(titulo.id_titulo);

    if (!tituloExiste)
      return response.status(404).json({ mensagem: "Titulo não existe" });

    await TituloModel.update(
      { tx_descricao: titulo.tx_descricao },
      { where: { id_titulo: titulo.id_titulo } }
    );

    return response.status(200).json(titulo);
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
        .json({ mensagem: "É necessário o id do Titulo" });

    const titulo = await TituloModel.findByPk(id);

    if (!titulo) return response.status(404).json();

    await TituloModel.destroy({
      where: {
        id_titulo: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const TituloController = {
  get,
  destroy,
  post,
  put,
};

export { TituloController };
