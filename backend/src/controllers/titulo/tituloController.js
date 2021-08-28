import { TituloModel } from "@/models/titulo/tituloModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const titulo = await TituloModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!titulo) return await response.sendStatus(404);

      return await response.status(200).json(titulo);
    } else {
      const titulos = await TituloModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(titulos);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const titulo = request.body;

    if (!titulo.tx_descricao) {
      return await response
        .status(400)
        .json({ mensagem: "Campo tx_descrição é obrigatorio" });
    }

    const tituloCriado = await TituloModel.create({
      tx_descricao: titulo.tx_descricao,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const titulo = request.body;

    if (!titulo.id_titulo || !titulo.tx_descricao)
      return await response
        .status(400)
        .json({ mensagem: "É necessário o campo id_titulo e tx_descricao" });

    const tituloExiste = await TituloModel.findByPk(titulo.id_titulo);

    if (!tituloExiste)
      return await response.status(404).json({ mensagem: "Titulo não existe" });

    const tituloAtualizado = await TituloModel.update(
      { tx_descricao: titulo.tx_descricao },
      { where: { id_titulo: titulo.id_titulo } }
    );

    return await response.status(200).json(titulo);
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
        .json({ mensagem: "É necessário o id do Titulo" });

    const titulo = await TituloModel.findByPk(id);

    if (!titulo) return await response.status(404).json();

    await TituloModel.destroy({
      where: {
        id_titulo: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const TituloController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { TituloController };
