alter table professor 
	add constraint tx_sexo check (tx_sexo in ('m', 'f'));
alter table professor 
	add constraint tx_estado_civil CHECK (tx_estado_civil IN ('s', 'c', 'd'));

alter table disciplina 
	add constraint in_carga_horaria check (in_carga_horaria >= 40);

alter table disciplina
	add constraint in_periodo check (in_periodo >= 1);

alter table aluno 
add constraint tx_sexo check (tx_sexo in ('m', 'f'))

alter table cursa 
add constraint in_faltas
check (in_faltas >= 0);

alter table cursa 
add constraint nm_nota1
check (nm_nota1 >= 0);

alter table cursa 
add constraint nm_nota2
check (nm_nota2 >= 0);

alter table cursa 
add constraint nm_nota3
check (nm_nota3 >= 0);

