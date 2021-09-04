import { IDisicplina } from "../disciplina/IDisciplina";
import { IProfessor } from "./IProfessor";

export interface IDisciplinaPorProfessor extends IProfessor {
  disciplinas: Array<IDisicplina>;
  qtdDisciplinas: number;
}
