import { CursaModel } from "@/models/cursa/cursaModel";
import { pagination } from "@/utils/pagination";

const get = async (request, response) => {
  try {
    const start = request.query.start;
    const length = request.query.length;

    const parsedPagination = pagination(start, length);

    if (request.params.id) {
      const id = request.params.id;

      const cursa = await CursaModel.findByPk(id, {
        ...parsedPagination,
      });

      if (!cursa) return await response.sendStatus(404);

      return await response.status(200).json(cursa);
    } else {
      const cursas = await CursaModel.findAll({
        ...parsedPagination,
      });

      return await response.status(200).json(cursas);
    }
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const post = async (request, response) => {
  try {
    const cursa = request.body;

    if (
      !cursa.id_disciplina ||
      !cursa.id_aluno ||
      !cursa.id_ano ||
      !cursa.in_semestre ||
      !cursa.in_faltas ||
      !cursa.nm_nota1 ||
      !cursa.nm_nota2 ||
      !cursa.nm_nota3 ||
      cursa.bl_aprovado == undefined ||
      cursa.bl_aprovado == null
    ) {
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });
    }

    const cursaCriado = await CursaModel.create({
      id_disciplina: cursa.id_disciplina,
      id_aluno: cursa.id_aluno,
      id_ano: cursa.id_ano,
      in_semestre: cursa.in_semestre,
      in_faltas: cursa.in_faltas,
      nm_nota1: cursa.nm_nota1,
      nm_nota2: cursa.nm_nota2,
      nm_nota3: cursa.nm_nota3,
      bl_aprovado: cursa.bl_aprovado,
    });

    return await response.sendStatus(201);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const put = async (request, response) => {
  try {
    const cursa = request.body;

    if (
      !cursa.id_disciplina ||
      !cursa.id_aluno ||
      !cursa.id_ano ||
      !cursa.in_semestre ||
      !cursa.in_faltas ||
      !cursa.nm_nota1 ||
      !cursa.nm_nota2 ||
      !cursa.nm_nota3 ||
      cursa.bl_aprovado == undefined ||
      cursa.bl_aprovado == null
    )
      return await response
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando" });

    const cursaExiste = await CursaModel.findOne({
      where: { id_disciplina: cursa.id_disciplina },
    });

    if (!cursaExiste)
      return await response.status(404).json({ mensagem: "Cursa não existe" });

    const cursaAtualizado = await CursaModel.update(
      {
        id_disciplina: cursa.id_disciplina,
        id_aluno: cursa.id_aluno,
        id_ano: cursa.id_ano,
        in_semestre: cursa.in_semestre,
        in_faltas: cursa.in_faltas,
        nm_nota1: cursa.nm_nota1,
        nm_nota2: cursa.nm_nota2,
        nm_nota3: cursa.nm_nota3,
        bl_aprovado: cursa.bl_aprovado,
      },
      { where: { id_disciplina: cursa.id_disciplina } }
    );

    return await response.status(200).json(cursa);
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
        .json({ mensagem: "É necessário o id da tabela cursa" });

    const cursa = await CursaModel.findOne({
      where: { id_disciplina: id },
    });

    if (!cursa) return await response.status(404).json();

    await CursaModel.destroy({
      where: {
        id_disciplina: id,
      },
    });

    return await response.sendStatus(200);
  } catch (error) {
    return await response.status(500).json(error);
  }
};

const CursaController = {
  get,
  destroy,
  post,
  put,
};

module.exports = { CursaController };
