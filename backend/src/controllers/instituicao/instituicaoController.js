import { CursoModel } from "@/models/curso/cursoModel";
import { InstituicaoModel } from "@/models/instituicao/instituicaoModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const instituicao = await InstituicaoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!instituicao) return await response.sendStatus(404);

      return await response.status(200).json(instituicao);
    } else {
      const instituicoes = await InstituicaoModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(instituicoes);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const instituicao = request.body;

    if (!instituicao.tx_sigla || !instituicao.tx_descricao) {
      return await response
        .status(400)
        .json({ mensagem: "Campo tx_descrição e tx_sigla é obrigatorio" });
    }

    await InstituicaoModel.create({
      tx_descricao: instituicao.tx_descricao,
      tx_sigla: instituicao.tx_sigla,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const instituicao = request.body;

    if (
      !instituicao.id_instituicao ||
      !instituicao.tx_descricao ||
      !instituicao.tx_sigla
    )
      return await response.status(400).json({
        mensagem:
          "É necessário o campo id_instituicao, tx_descricao e tx_sigla",
      });

    const instituicaoExiste = await InstituicaoModel.findByPk(
      instituicao.id_instituicao
    );

    if (!instituicaoExiste)
      return await response
        .status(404)
        .json({ mensagem: "Instituicao não existe" });

    await InstituicaoModel.update(
      {
        tx_descricao: instituicao.tx_descricao,
        tx_sigla: instituicao.tx_sigla,
      },
      { where: { id_instituicao: instituicao.id_instituicao } }
    );

    return await response.sendStatus(200);
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
        .json({ mensagem: "É necessário o id da instituicao" });

    const instituicao = await InstituicaoModel.findByPk(id);

    if (!instituicao) return await response.status(404).json();

    await InstituicaoModel.destroy({
      where: {
        id_instituicao: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const getQtdCursoPorInstituicao = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    const cursos = await InstituicaoModel.findAll({
      //raw: true,
      include: [CursoModel],
      ...parsedPagination,
    });

    return await response.status(200).json(cursos);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const InstituicaoController = {
  get,
  getQtdCursoPorInstituicao,
  destroy,
  post,
  put,
};

module.exports = { InstituicaoController };
