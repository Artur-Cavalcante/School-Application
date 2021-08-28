import { DisciplinaModel } from "@/models/disciplina/disciplinaModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const disciplina = await DisciplinaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!disciplina) return await response.sendStatus(404);

      return await response.status(200).json(disciplina);
    } else {
      const disciplinas = await DisciplinaModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(disciplinas);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const disciplina = request.body;

    if (
      !disciplina.id_disciplina ||
      !disciplina.tx_sigla ||
      !disciplina.tx_descricao ||
      !disciplina.in_periodo ||
      !disciplina.in_carga_horaria ||
      !disciplina.id_curso ||
      !disciplina.id_tipo_disciplina
    ) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    if (disciplina.in_carga_horaria < 40) {
      return await response
        .status(400)
        .json({ mensagem: "Carga horária deve ser maior ou igual a 40" });
    }

    if (disciplina.in_periodo < 1) {
      return await response
        .status(400)
        .json({ mensagem: "Periodo deve ser igual ou maior que 1" });
    }

    const disciplinaCriado = await DisciplinaModel.create({
      id_disciplina: disciplina.id_disciplina,
      tx_sigla: disciplina.tx_sigla,
      tx_descricao: disciplina.tx_descricao,
      in_periodo: disciplina.in_periodo,
      in_carga_horaria: disciplina.in_carga_horaria,
      id_curso: disciplina.id_curso,
      id_tipo_disciplina: disciplina.id_tipo_disciplina,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const disciplina = request.body;

    if (
      !disciplina.id_disciplina ||
      !disciplina.tx_sigla ||
      !disciplina.tx_descricao ||
      !disciplina.in_periodo ||
      !disciplina.in_carga_horaria
    )
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    if (disciplina.in_carga_horaria < 40) {
      return await response
        .status(400)
        .json({ mensagem: "Carga horária deve ser maior ou igual a 40" });
    }

    if (disciplina.in_periodo < 1) {
      return await response
        .status(400)
        .json({ mensagem: "Periodo deve ser igual ou maior que 1" });
    }

    const disciplinaExiste = await DisciplinaModel.findByPk(
      disciplina.id_disciplina
    );

    if (!disciplinaExiste)
      return await response
        .status(404)
        .json({ mensagem: "Disciplina não existe" });

    const disciplinaAtualizado = await DisciplinaModel.update(
      {
        id_disciplina: disciplina.id_disciplina,
        tx_sigla: disciplina.tx_sigla,
        tx_descricao: disciplina.tx_descricao,
        in_periodo: disciplina.in_periodo,
        in_carga_horaria: disciplina.in_carga_horaria,
      },
      { where: { id_disciplina: disciplina.id_disciplina } }
    );

    return await response.status(200).json(disciplina);
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
        .json({ mensagem: "É necessário o id da disciplina" });

    const disciplina = await DisciplinaModel.findByPk(id);

    if (!disciplina) return await response.status(404).json();

    await DisciplinaModel.destroy({
      where: {
        id_disciplina: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const DisciplinaController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { DisciplinaController };
