import { ModelCtor } from "sequelize/types";

import { DataTypes } from "sequelize";
import { _dbContext } from "@/infra/context";

import { AlunoModel } from "@/models/aluno/alunoModel";
import { DisciplinaModel } from "@/models/disciplina/disciplinaModel";
import { ICursa } from "@/interfaces/cursa/ICursa";

const CursaModel: ModelCtor<ICursa> = _dbContext.define(
  "cursa",
  {
    id_ano: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    in_semestre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    in_faltas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nm_nota1: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    nm_nota2: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    nm_nota3: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    bl_aprovado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    id_aluno: {
      //@ts-ignore
      model: AlunoModel,
      key: "id_aluno",
      type: DataTypes.INTEGER,
    },
    id_disciplina: {
      //@ts-ignore
      model: DisciplinaModel,
      key: "id_aluno",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "cursa", createdAt: false, updatedAt: false }
);

AlunoModel.hasMany(CursaModel, {
  foreignKey: "id_aluno",
});
DisciplinaModel.hasMany(CursaModel, {
  foreignKey: "id_disciplina",
});

export { CursaModel };
