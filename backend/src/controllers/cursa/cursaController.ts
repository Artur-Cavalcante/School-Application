import { ICursa } from "@/interfaces/cursa/ICursa";
import { IReprovacoesPorAno } from "@/interfaces/cursa/IReprovacoesPorAno";
import { CursaModel } from "@/models/cursa/cursaModel";
import { pagination } from "@/utils/pagination";
import { Request, RequestHandler, Response } from "express";
import sequelize, { NonNullFindOptions } from "sequelize";

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

      const cursa = await CursaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!cursa) return response.sendStatus(404);

      return response.status(200).json(cursa);
    } else {
      const cursas = await CursaModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(cursas);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const cursa: ICursa = request.body;

    if (
      !cursa.id_disciplina ||
      !cursa.id_aluno ||
      !cursa.id_ano ||
      !cursa.in_semestre ||
      !cursa.in_faltas ||
      !cursa.nm_nota1 ||
      !cursa.nm_nota2 ||
      !cursa.nm_nota3 ||
      cursa.bl_aprovado == undefined ||
      cursa.bl_aprovado == null
    ) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await CursaModel.create({
      id_disciplina: cursa.id_disciplina,
      id_aluno: cursa.id_aluno,
      id_ano: cursa.id_ano,
      in_semestre: cursa.in_semestre,
      in_faltas: cursa.in_faltas,
      nm_nota1: cursa.nm_nota1,
      nm_nota2: cursa.nm_nota2,
      nm_nota3: cursa.nm_nota3,
      bl_aprovado: cursa.bl_aprovado,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const cursa: ICursa = request.body;

    if (
      !cursa.id_disciplina ||
      !cursa.id_aluno ||
      !cursa.id_ano ||
      !cursa.in_semestre ||
      !cursa.in_faltas ||
      !cursa.nm_nota1 ||
      !cursa.nm_nota2 ||
      !cursa.nm_nota3 ||
      cursa.bl_aprovado == undefined ||
      cursa.bl_aprovado == null
    )
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const cursaExiste = await CursaModel.findOne({
      where: { id_disciplina: cursa.id_disciplina },
    });

    if (!cursaExiste)
      return response.status(404).json({ mensagem: "Cursa não existe" });

    await CursaModel.update(
      {
        id_disciplina: cursa.id_disciplina,
        id_aluno: cursa.id_aluno,
        id_ano: cursa.id_ano,
        in_semestre: cursa.in_semestre,
        in_faltas: cursa.in_faltas,
        nm_nota1: cursa.nm_nota1,
        nm_nota2: cursa.nm_nota2,
        nm_nota3: cursa.nm_nota3,
        bl_aprovado: cursa.bl_aprovado,
      },
      { where: { id_disciplina: cursa.id_disciplina } }
    );

    return response.status(200).json(cursa);
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
        .json({ mensagem: "É necessário o id da tabela cursa" });

    const cursa = await CursaModel.findOne({
      where: { id_disciplina: id },
    });

    if (!cursa) return response.status(404).json();

    await CursaModel.destroy({
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

const getQtdReprovacoesPorAno: RequestHandler = async (
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

    let cursas = (await CursaModel.findAll({
      attributes: [
        "id_ano",
        [
          sequelize.fn("COUNT", sequelize.col("id_aluno")),
          "qtdReprovacoesPorAno",
        ],
      ],
      group: ["id_ano"],
      order: [["id_ano", "ASC"]],
      ...parsedPagination,
    })) as IReprovacoesPorAno[];

    cursas = cursas.map((cursa) => {
      cursa.setDataValue(
        "qtdReprovacoesPorAno",
        Number(cursa.getDataValue("qtdReprovacoesPorAno"))
      );

      return cursa;
    });

    return response.status(200).json(cursas);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const CursaController = {
  get,
  getQtdReprovacoesPorAno,
  destroy,
  post,
  put,
};

export { CursaController };
