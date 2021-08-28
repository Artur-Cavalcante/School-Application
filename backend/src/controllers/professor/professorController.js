import { ProfessorModel } from "@/models/professor/professorModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const professor = await ProfessorModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!professor) return await response.sendStatus(404);

      return await response.status(200).json(professor);
    } else {
      const professores = await ProfessorModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(professores);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const professor = request.body;

    if (
      !professor.tx_sexo ||
      !professor.tx_nome ||
      !professor.tx_estado_civil ||
      !professor.dt_nascimento ||
      !professor.tx_telefone ||
      !professor.id_titulo
    ) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const professorCriado = await ProfessorModel.create({
      tx_descricao: professor.tx_descricao,
      tx_sexo: professor.tx_sexo,
      tx_nome: professor.tx_nome,
      tx_estado_civil: professor.tx_estado_civil,
      dt_nascimento: professor.dt_nascimento,
      tx_telefone: professor.tx_telefone,
      id_titulo: professor.id_titulo,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const professor = request.body;

    if (
      !professor.tx_sexo ||
      !professor.tx_nome ||
      !professor.tx_estado_civil ||
      !professor.dt_nascimento ||
      !professor.tx_telefone ||
      !professor.id_titulo
    )
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const professorExiste = await ProfessorModel.findByPk(professor.id_titulo);

    if (!professorExiste)
      return await response
        .status(404)
        .json({ mensagem: "Professor não existe" });

    const professorAtualizado = await ProfessorModel.update(
      {
        tx_descricao: professor.tx_descricao,
        tx_sexo: professor.tx_sexo,
        tx_nome: professor.tx_nome,
        tx_estado_civil: professor.tx_estado_civil,
        dt_nascimento: professor.dt_nascimento,
        tx_telefone: professor.tx_telefone,
        id_titulo: professor.id_titulo,
      },
      { where: { id_professor: professor.id_professor } }
    );

    return await response.status(200).json(professor);
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
        .json({ mensagem: "É necessário o id do Professor" });

    const professor = await ProfessorModel.findByPk(id);

    if (!professor) return await response.status(404).json();

    await ProfessorModel.destroy({
      where: {
        id_professor: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const ProfessorController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { ProfessorController };
