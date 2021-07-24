import { TituloModel } from "@/models/titulo/tituloModel";

const get = async (request, response) => {
  let id = null;
  let titulos = [];

  try {
    if (request.params.id) {
      id = request.params.id;

      titulos = await TituloModel.findByPk(id);
    } else {
      titulos = await TituloModel.findAll();
    }

    return await response.status(200).json(titulos);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const TituloController = {
  get,
};

module.exports = { TituloController };
