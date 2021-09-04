import { ICurso } from "@/interfaces/curso/ICurso";
import { IInstituicao } from "./IInstituicao";

export interface ICursoPorInstituicao extends IInstituicao {
  cursos: Array<ICurso>;
  qtdCursos: number;
}
