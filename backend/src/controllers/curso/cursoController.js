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

      const curso = await CursoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!curso) return await response.sendStatus(404);

      return await response.status(200).json(curso);
    } else {
      const cursos = await CursoModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(cursos);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const curso = request.body;

    if (!curso.id_instituicao || !curso.id_tipo_curso || !curso.tx_descricao) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatorios faltantes" });
    }

    await CursoModel.create({
      id_curso: curso.id_curso,
      id_instituicao: curso.id_instituicao,
      id_tipo_curso: curso.id_tipo_curso,
      tx_descricao: curso.tx_descricao,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const curso = request.body;

    if (
      !curso.id_curso ||
      !curso.id_instituicao ||
      !curso.id_tipo_curso ||
      !curso.tx_descricao
    )
      return await response.status(400).json({
        mensagem: "Campos obrigatorios faltantes",
      });

    const cursoExiste = await CursoModel.findByPk(curso.id_curso);

    if (!cursoExiste)
      return await response.status(404).json({ mensagem: "Curso não existe" });

    await CursoModel.update(
      {
        id_curso: curso.id_curso,
        id_instituicao: curso.id_instituicao,
        id_tipo_curso: curso.id_tipo_curso,
        tx_descricao: curso.tx_descricao,
      },
      { where: { id_curso: curso.id_curso } }
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
        .json({ mensagem: "É necessário o id do curso" });

    const curso = await CursoModel.findByPk(id);

    if (!curso) return await response.status(404).json();

    await CursoModel.destroy({
      where: {
        id_curso: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const CursoController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { CursoController };
