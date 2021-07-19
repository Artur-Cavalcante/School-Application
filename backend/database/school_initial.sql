CREATE TABLE aluno
(
  id_aluno      SERIAL       NOT NULL,
  tx_nome       VARCHAR(100) NOT NULL,
  tx_sexo       CHAR(1)      NOT NULL,
  dt_nascimento DATE         NOT NULL,
  PRIMARY KEY (id_aluno)
);

CREATE TABLE cursa
(
  id_aluno      SERIAL       NOT NULL,
  id_disciplina SERIAL       NOT NULL,
  id_ano        INTEGER      NOT NULL,
  in_semestre   INTEGER      NOT NULL,
  in_faltas     INTEGER      NOT NULL DEFAULT 0,
  nm_nota1      NUMERIC(4,2),
  nm_nota2      NUMERIC(4,2),
  nm_nota3      NUMERIC(4,2),
  bl_aprovado   BOOLEAN      NOT NULL DEFAULT false,
  PRIMARY KEY (id_aluno, id_disciplina, id_ano, in_semestre)
);

CREATE TABLE curso
(
  id_curso       SERIAL       NOT NULL,
  id_instituicao SERIAL       NOT NULL UNIQUE,
  id_tipo_curso  SERIAL       NOT NULL UNIQUE,
  tx_descricao   VARCHAR(150) NOT NULL UNIQUE,
  PRIMARY KEY (id_curso)
);

CREATE TABLE disciplina
(
  id_disciplina      SERIAL       NOT NULL,
  id_curso           SERIAL       NOT NULL,
  id_tipo_disciplina SERIAL       NOT NULL,
  tx_sigla           VARCHAR(10)  NOT NULL UNIQUE,
  tx_descricao       VARCHAR(150) NOT NULL UNIQUE,
  in_periodo         INTEGER      NOT NULL,
  in_carga_horaria   INTEGER      NOT NULL,
  PRIMARY KEY (id_disciplina)
);

CREATE TABLE instituicao
(
  id_instituicao SERIAL       NOT NULL,
  tx_sigla       VARCHAR(15)  NOT NULL UNIQUE,
  tx_descricao   VARCHAR(150) NOT NULL UNIQUE,
  PRIMARY KEY (id_instituicao)
);

CREATE TABLE leciona
(
  id_disciplina SERIAL NOT NULL,
  id_professor  SERIAL NOT NULL,
  PRIMARY KEY (id_disciplina, id_professor)
);

CREATE TABLE professor
(
  id_professor    SERIAL      NOT NULL,
  id_titulo       SERIAL      NOT NULL,
  tx_nome         VARCHAR(50) NOT NULL,
  tx_sexo         CHAR(1)     NOT NULL DEFAULT 'm',
  tx_estado_civil CHAR(1)     NOT NULL DEFAULT 's',
  dt_nascimento   DATE        NOT NULL,
  tx_telefone     VARCHAR(13) NOT NULL,
  PRIMARY KEY (id_professor)
);

CREATE TABLE tipo_curso
(
  id_tipo_curso SERIAL       NOT NULL,
  tx_descricao  VARCHAR(150) NOT NULL UNIQUE,
  PRIMARY KEY (id_tipo_curso)
);

CREATE TABLE tipo_disciplina
(
  id_tipo_disciplina SERIAL       NOT NULL,
  tx_descricao       VARCHAR(150) NOT NULL UNIQUE,
  PRIMARY KEY (id_tipo_disciplina)
);

CREATE TABLE titulo
(
  id_titulo    SERIAL       NOT NULL,
  tx_descricao VARCHAR(150) NOT NULL UNIQUE,
  PRIMARY KEY (id_titulo)
);

ALTER TABLE professor
  ADD CONSTRAINT FK_titulo_TO_professor
    FOREIGN KEY (id_titulo)
    REFERENCES titulo (id_titulo)
	ON DELETE CASCADE
  	ON UPDATE CASCADE;
  
  
ALTER TABLE curso
  ADD CONSTRAINT FK_instituicao_TO_curso
    FOREIGN KEY (id_instituicao)
    REFERENCES instituicao (id_instituicao)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE curso
  ADD CONSTRAINT FK_tipo_curso_TO_curso
    FOREIGN KEY (id_tipo_curso)
    REFERENCES tipo_curso (id_tipo_curso)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE cursa
  ADD CONSTRAINT FK_aluno_TO_cursa
    FOREIGN KEY (id_aluno)
    REFERENCES aluno (id_aluno)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE cursa
  ADD CONSTRAINT FK_disciplina_TO_cursa
    FOREIGN KEY (id_disciplina)
    REFERENCES disciplina (id_disciplina)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE disciplina
  ADD CONSTRAINT FK_tipo_disciplina_TO_disciplina
    FOREIGN KEY (id_tipo_disciplina)
    REFERENCES tipo_disciplina (id_tipo_disciplina)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE disciplina
  ADD CONSTRAINT FK_curso_TO_disciplina
    FOREIGN KEY (id_curso)
    REFERENCES curso (id_curso)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE leciona
  ADD CONSTRAINT FK_disciplina_TO_leciona
    FOREIGN KEY (id_disciplina)
    REFERENCES disciplina (id_disciplina)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

ALTER TABLE leciona
  ADD CONSTRAINT FK_professor_TO_leciona
    FOREIGN KEY (id_professor)
    REFERENCES professor (id_professor)
    ON DELETE CASCADE
  	ON UPDATE CASCADE;

