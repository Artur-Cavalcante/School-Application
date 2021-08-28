import { TipoDisciplinaModel } from "@/models/tipo-disciplina/tipoDisciplinaModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const tipoDisciplina = await TipoDisciplinaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!tipoDisciplina) return await response.sendStatus(404);

      return await response.status(200).json(tipoDisciplina);
    } else {
      const tiposDisciplina = await TipoDisciplinaModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(tiposDisciplina);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const tipoDisciplina = request.body;

    if (!tipoDisciplina.tx_descricao || !tipoDisciplina.id_tipo_disciplina) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const tipoDisciplinaCriado = await TipoDisciplinaModel.create({
      id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina,
      tx_descricao: tipoDisciplina.tx_descricao,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const tipoDisciplina = request.body;

    if (!tipoDisciplina.id_tipo_disciplina || !tipoDisciplina.tx_descricao)
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const tipoDisciplinaExiste = await TipoDisciplinaModel.findByPk(
      tipoDisciplina.id_tipo_disciplina
    );

    if (!tipoDisciplinaExiste)
      return await response
        .status(404)
        .json({ mensagem: "Tipo Disciplina não existe" });

    const tipoDisciplinaAtualizado = await TipoDisciplinaModel.update(
      {
        id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina,
        tx_descricao: tipoDisciplina.tx_descricao,
      },
      { where: { id_tipo_disciplina: tipoDisciplina.id_tipo_disciplina } }
    );

    return await response.status(200).json(tipoDisciplina);
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
        .json({ mensagem: "É necessário o id do Tipo Disciplina" });

    const tipoDisciplina = await TipoDisciplinaModel.findByPk(id);

    if (!tipoDisciplina) return await response.status(404).json();

    await TipoDisciplinaModel.destroy({
      where: {
        id_tipo_disciplina: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const TipoDisciplinaController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { TipoDisciplinaController };
