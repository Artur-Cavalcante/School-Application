import { ProfessorModel } from "@/models/professor/professorModel";
import { pagination } from "@/utils/pagination";
import { DisciplinaModel } from "@/models/disciplina/disciplinaModel";
import sequelize, { NonNullFindOptions } from "sequelize";
import { Request, RequestHandler, Response } from "express";
import { IProfessor } from "@/interfaces/professor/IProfessor";
import { IDisciplinaPorProfessor } from "@/interfaces/professor/IDisciplinasPorProfessor";
import { IProfessoresPorEstadoCivil } from "@/interfaces/professor/IProfessoresPorEstadoCivil";

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

      const professor = await ProfessorModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!professor) return response.sendStatus(404);

      return response.status(200).json(professor);
    } else {
      const professores = await ProfessorModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(professores);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const professor: IProfessor = request.body;

    if (
      !professor.tx_sexo ||
      !professor.tx_nome ||
      !professor.tx_estado_civil ||
      !professor.dt_nascimento ||
      !professor.tx_telefone ||
      !professor.id_titulo
    ) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    await ProfessorModel.create({
      tx_sexo: professor.tx_sexo,
      tx_nome: professor.tx_nome,
      tx_estado_civil: professor.tx_estado_civil,
      dt_nascimento: professor.dt_nascimento,
      tx_telefone: professor.tx_telefone,
      id_titulo: professor.id_titulo,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const professor: IProfessor = request.body;

    if (
      !professor.tx_sexo ||
      !professor.tx_nome ||
      !professor.tx_estado_civil ||
      !professor.dt_nascimento ||
      !professor.tx_telefone ||
      !professor.id_titulo
    )
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const professorExiste = await ProfessorModel.findByPk(professor.id_titulo);

    if (!professorExiste)
      return response.status(404).json({ mensagem: "Professor não existe" });

    await ProfessorModel.update(
      {
        tx_sexo: professor.tx_sexo,
        tx_nome: professor.tx_nome,
        tx_estado_civil: professor.tx_estado_civil,
        dt_nascimento: professor.dt_nascimento,
        tx_telefone: professor.tx_telefone,
        id_titulo: professor.id_titulo,
      },
      { where: { id_professor: professor.id_professor } }
    );

    return response.status(200).json(professor);
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
        .json({ mensagem: "É necessário o id do Professor" });

    const professor = await ProfessorModel.findByPk(id);

    if (!professor) return response.status(404).json();

    await ProfessorModel.destroy({
      where: {
        id_professor: id,
      },
    });

    return response.sendStatus(200);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const getQtdDisciplinasPorProfessor: RequestHandler = async (
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

    let professores = (await ProfessorModel.findAll({
      attributes: ["tx_nome"],
      //raw: true,
      include: [
        {
          model: DisciplinaModel,
          attributes: ["tx_sigla"],
        },
      ],
      ...parsedPagination,
    })) as IDisciplinaPorProfessor[];

    professores.forEach((professor) => {
      professor.setDataValue("qtdDisciplinas", professor.disciplinas.length);
    });

    return response.status(200).json(professores);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const getQtdProfessorPorEstadoCivil: RequestHandler = async (
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

    let professores = (await ProfessorModel.findAll({
      attributes: [
        "tx_estado_civil",
        [
          sequelize.fn("COUNT", sequelize.col("id_professor")),
          "qtdProfessoresPorEstadoCivil",
        ],
      ],
      group: ["tx_estado_civil"],
      ...parsedPagination,
    })) as IProfessoresPorEstadoCivil[];

    professores = professores.map((professor) => {
      professor.setDataValue(
        "qtdProfessoresPorEstadoCivil",
        Number(professor.getDataValue("qtdProfessoresPorEstadoCivil"))
      );

      let name = "Solteiro";

      if (professor.getDataValue("tx_estado_civil") === "d")
        name = "Divorciado";
      if (professor.getDataValue("tx_estado_civil") === "c") name = "Casado";

      professor.setDataValue("name", name);

      return professor;
    });
    return response.status(200).json(professores);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const ProfessorController = {
  get,
  getQtdDisciplinasPorProfessor,
  getQtdProfessorPorEstadoCivil,
  destroy,
  post,
  put,
};

export { ProfessorController };
