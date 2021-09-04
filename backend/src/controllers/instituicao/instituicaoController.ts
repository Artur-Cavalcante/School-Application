import { ICursoPorInstituicao } from "@/interfaces/instituicao/ICursoPorInstituicao";
import { IInstituicao } from "@/interfaces/instituicao/IInstituicao";
import { CursoModel } from "@/models/curso/cursoModel";
import { InstituicaoModel } from "@/models/instituicao/instituicaoModel";
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

      const instituicao = await InstituicaoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!instituicao) return response.sendStatus(404);

      return response.status(200).json(instituicao);
    } else {
      const instituicoes = await InstituicaoModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(instituicoes);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const instituicao: IInstituicao = request.body;

    if (!instituicao.tx_sigla || !instituicao.tx_descricao) {
      return response
        .status(400)
        .json({ mensagem: "Campo tx_descrição e tx_sigla é obrigatorio" });
    }

    await InstituicaoModel.create({
      tx_descricao: instituicao.tx_descricao,
      tx_sigla: instituicao.tx_sigla,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const instituicao: IInstituicao = request.body;

    if (
      !instituicao.id_instituicao ||
      !instituicao.tx_descricao ||
      !instituicao.tx_sigla
    )
      return response.status(400).json({
        mensagem:
          "É necessário o campo id_instituicao, tx_descricao e tx_sigla",
      });

    const instituicaoExiste = await InstituicaoModel.findByPk(
      instituicao.id_instituicao
    );

    if (!instituicaoExiste)
      return response.status(404).json({ mensagem: "Instituicao não existe" });

    await InstituicaoModel.update(
      {
        tx_descricao: instituicao.tx_descricao,
        tx_sigla: instituicao.tx_sigla,
      },
      { where: { id_instituicao: instituicao.id_instituicao } }
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
        .json({ mensagem: "É necessário o id da instituicao" });

    const instituicao = await InstituicaoModel.findByPk(id);

    if (!instituicao) return response.status(404).json();

    await InstituicaoModel.destroy({
      where: {
        id_instituicao: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const getQtdCursoPorInstituicao: RequestHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const start = request.query.start ? Number(request.query.start) : undefined;
    const length = request.query.length
      ? Number(request.query.length)
      : undefined;

    const parsedPagination: Omit<
      NonNullFindOptions<unknown>,
      "where"
    > = pagination(start, length);

    let instituicoes = (await InstituicaoModel.findAll({
      //raw: true,
      include: [CursoModel],
      ...parsedPagination,
    })) as ICursoPorInstituicao[];

    instituicoes.forEach((instituicao) => {
      instituicao.setDataValue("qtdCursos", instituicao.cursos.length);
    });

    return response.status(200).json(instituicoes);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const InstituicaoController = {
  get,
  getQtdCursoPorInstituicao,
  destroy,
  post,
  put,
};

export { InstituicaoController };
