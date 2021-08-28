import { AlunoModel } from "@/models/aluno/alunoModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const aluno = await AlunoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!aluno) return await response.sendStatus(404);

      return await response.status(200).json(aluno);
    } else {
      const alunos = await AlunoModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(alunos);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const aluno = request.body;

    if (
      !aluno.id_aluno ||
      !aluno.tx_nome ||
      !aluno.tx_sexo ||
      !aluno.dt_nascimento
    ) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const alunoCriado = await AlunoModel.create({
      id_aluno: aluno.id_aluno,
      tx_nome: aluno.tx_nome,
      tx_sexo: aluno.tx_sexo,
      dt_nascimento: aluno.dt_nascimento,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const aluno = request.body;

    if (
      !aluno.id_aluno ||
      !aluno.tx_nome ||
      !aluno.tx_sexo ||
      !aluno.dt_nascimento
    )
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const alunoExiste = await AlunoModel.findByPk(aluno.id_aluno);

    if (!alunoExiste)
      return await response.status(404).json({ mensagem: "Aluno não existe" });

    const alunoAtualizado = await AlunoModel.update(
      {
        id_aluno: aluno.id_aluno,
        tx_nome: aluno.tx_nome,
        tx_sexo: aluno.tx_sexo,
        dt_nascimento: aluno.dt_nascimento,
      },
      { where: { id_aluno: aluno.id_aluno } }
    );

    return await response.status(200).json(aluno);
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
        .json({ mensagem: "É necessário o id do Aluno" });

    const aluno = await AlunoModel.findByPk(id);

    if (!aluno) return await response.status(404).json();

    await AlunoModel.destroy({
      where: {
        id_aluno: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const AlunoController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { AlunoController };
