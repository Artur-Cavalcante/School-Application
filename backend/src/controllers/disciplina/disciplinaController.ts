import { IDisicplina } from "@/interfaces/disciplina/IDisciplina";
import { DisciplinaModel } from "@/models/disciplina/disciplinaModel";
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

      const disciplina = await DisciplinaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!disciplina) return response.sendStatus(404);

      return response.status(200).json(disciplina);
    } else {
      const disciplinas = await DisciplinaModel.findAll({
        ...parsedPagination,
      });

      return response.status(200).json(disciplinas);
    }
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const post: RequestHandler = async (request: Request, response: Response) => {
  try {
    const disciplina: IDisicplina = request.body;

    if (
      !disciplina.id_disciplina ||
      !disciplina.tx_sigla ||
      !disciplina.tx_descricao ||
      !disciplina.in_periodo ||
      !disciplina.in_carga_horaria ||
      !disciplina.id_curso ||
      !disciplina.id_tipo_disciplina
    ) {
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    if (disciplina.in_carga_horaria < 40) {
      return response
        .status(400)
        .json({ mensagem: "Carga horária deve ser maior ou igual a 40" });
    }

    if (disciplina.in_periodo < 1) {
      return response
        .status(400)
        .json({ mensagem: "Periodo deve ser igual ou maior que 1" });
    }

    await DisciplinaModel.create({
      id_disciplina: disciplina.id_disciplina,
      tx_sigla: disciplina.tx_sigla,
      tx_descricao: disciplina.tx_descricao,
      in_periodo: disciplina.in_periodo,
      in_carga_horaria: disciplina.in_carga_horaria,
      id_curso: disciplina.id_curso,
      id_tipo_disciplina: disciplina.id_tipo_disciplina,
    });

    return response.sendStatus(201);
  } catch (error) {
    console.log("Erro", error);
    return response.status(500).json(error);
  }
};

const put: RequestHandler = async (request: Request, response: Response) => {
  try {
    const disciplina: IDisicplina = request.body;

    if (
      !disciplina.id_disciplina ||
      !disciplina.tx_sigla ||
      !disciplina.tx_descricao ||
      !disciplina.in_periodo ||
      !disciplina.in_carga_horaria
    )
      return response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    if (disciplina.in_carga_horaria < 40) {
      return response
        .status(400)
        .json({ mensagem: "Carga horária deve ser maior ou igual a 40" });
    }

    if (disciplina.in_periodo < 1) {
      return response
        .status(400)
        .json({ mensagem: "Periodo deve ser igual ou maior que 1" });
    }

    const disciplinaExiste = await DisciplinaModel.findByPk(
      disciplina.id_disciplina
    );

    if (!disciplinaExiste)
      return response.status(404).json({ mensagem: "Disciplina não existe" });

    await DisciplinaModel.update(
      {
        id_disciplina: disciplina.id_disciplina,
        tx_sigla: disciplina.tx_sigla,
        tx_descricao: disciplina.tx_descricao,
        in_periodo: disciplina.in_periodo,
        in_carga_horaria: disciplina.in_carga_horaria,
      },
      { where: { id_disciplina: disciplina.id_disciplina } }
    );

    return response.status(200).json(disciplina);
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
        .json({ mensagem: "É necessário o id da disciplina" });

    const disciplina = await DisciplinaModel.findByPk(id);

    if (!disciplina) return response.status(404).json();

    await DisciplinaModel.destroy({
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

const DisciplinaController = {
  get,
  destroy,
  post,
  put,
};

export { DisciplinaController };
