import { LecionaModel } from "@/models/leciona/lecionaModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const leciona = await LecionaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!leciona) return await response.sendStatus(404);

      return await response.status(200).json(leciona);
    } else {
      const lecionas = await LecionaModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(lecionas);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const leciona = request.body;

    if (!leciona.id_disciplina || !leciona.id_professor) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const lecionaCriado = await LecionaModel.create({
      id_disciplina: leciona.id_disciplina,
      id_professor: leciona.id_professor,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const leciona = request.body;

    if (!leciona.id_disciplina || !leciona.id_professor)
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const lecionaExiste = await LecionaModel.findByPk(leciona.id_disciplina);

    if (!lecionaExiste)
      return await response
        .status(404)
        .json({ mensagem: "Leciona não existe" });

    const lecionaAtualizado = await LecionaModel.update(
      {
        id_disciplina: leciona.id_disciplina,
        id_professor: leciona.id_professor,
      },
      { where: { id_disciplina: leciona.id_disciplina } }
    );

    return await response.status(200).json(leciona);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const destroy = async (request, response) => {
  try {
    const id = request.body.id;

    if (!id)
      return await response
        .status(400)
        .json({ mensagem: "É necessário o id da tabela leciona" });

    const leciona = await LecionaModel.findByPk(id);

    if (!leciona) return await response.status(404).json();

    await LecionaModel.destroy({
      where: {
        id_disciplina: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const LecionaController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { LecionaController };
