import { TipoCursoModel } from "@/models/tipo-curso/tipoCursoModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const tipoCurso = await TipoCursoModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!tipoCurso) return await response.sendStatus(404);

      return await response.status(200).json(tipoCurso);
    } else {
      const tiposCurso = await TipoCursoModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(tiposCurso);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const tiposDoCurso = request.body;

    if (!tiposDoCurso.tx_descricao || !tiposDoCurso.id_tipo_curso) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const tiposDoCursoCriado = await TipoCursoModel.create({
      id_tipo_curso: tiposDoCurso.id_tipo_curso,
      tx_descricao: tiposDoCurso.tx_descricao,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const tipoCurso = request.body;

    if (!tipoCurso.id_tipo_curso || !tipoCurso.tx_descricao)
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const tipoCursoExiste = await TipoCursoModel.findByPk(
      tipoCurso.id_tipo_curso
    );

    if (!tipoCursoExiste)
      return await response
        .status(404)
        .json({ mensagem: "Tipo Curso não existe" });

    const tituloAtualizado = await TipoCursoModel.update(
      {
        id_tipo_curso: tipoCurso.id_tipo_curso,
        tx_descricao: tipoCurso.tx_descricao,
      },
      { where: { id_tipo_curso: tipoCurso.id_tipo_curso } }
    );

    return await response.status(200).json(tipoCurso);
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
        .json({ mensagem: "É necessário o id do Tipo do Curso" });

    const tipoDoCurso = await TipoCursoModel.findByPk(id);

    if (!tipoDoCurso) return await response.status(404).json();

    await TipoCursoModel.destroy({
      where: {
        id_tipo_curso: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const TipoCursoController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { TipoCursoController };
