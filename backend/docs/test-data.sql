
-- ****************************************
-- health_institutions
-- ****************************************

INSERT INTO public.health_institutions(id, name, time_tracking_code, administration_code) VALUES (1, 'Hospital São Lucas', 'HSLC', 'HSLG');
INSERT INTO public.health_institutions(id, name, time_tracking_code, administration_code) VALUES (2, 'Hospital de Clinicas de Porto Alegre', 'HCPC', 'HCPG');
INSERT INTO public.health_institutions(id, name, time_tracking_code, administration_code) VALUES (3, 'Grupo Hospitalar Conceição', 'GHCC', 'GHCG');
INSERT INTO public.health_institutions(id, name, time_tracking_code, administration_code) VALUES (4, 'Hospital de Pronto Socorro', 'HSPC', 'HPSG');
INSERT INTO public.health_institutions(id, name, time_tracking_code, administration_code) VALUES (5, 'Hospital Moinhos de Vento', 'HMVC', 'HMVG');

SELECT setval('health_institutions_id_seq', 5, true);

-- ****************************************
-- technologies
-- ****************************************

INSERT INTO public.technologies(id, name, health_institution_id) VALUES (1, 'AVC', 5);
INSERT INTO public.technologies(id, name, health_institution_id) VALUES (2, 'Prótese', 1);

SELECT setval('technologies_id_seq', 2, true);

-- ****************************************
-- activities
-- ****************************************

INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (1, 'Administração de antihipertensivo EV', 'Adm. antihipertensivo', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (2, 'Administração de medicamentos', 'Adm. meds.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (3, 'Administração de trombolítico', 'Adm. tromb.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (4, 'Administração de medicamentos para sedação', 'Adm. meds. sedação', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (5, 'Agendamento / adminsitração', 'Ag./adm.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (6, 'Análise de criterios de exclusão', 'Análise crit. excl.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (7, 'Aquisição das imagens na radiologia ou hemodinâmica', 'Aquis. imagens rad./hem.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (8, 'Auxílio na trombectomia mecânica', 'Aux. tromb. mec.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (9, 'Auxílio para alimentação', 'Aux. alim.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (10, 'Banho leito / higienização do paciente ', 'Banho/Higienização', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (11, 'Cirurgia', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (12, 'Coleta de exames laboratoriais (sangue, etc)', 'Coleta ex. lab.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (13, 'Confirma hipótese AVC', 'Conf. hip. AVC', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (14, 'Consulta', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (15, 'Cuidados na SR', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (16, 'Exames de imagem', 'Ex. imagem', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (17, 'Exames laboratoriais', 'Ex. lab.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (18, 'Gasometria', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (19, 'Higiene oral', 'Hig. oral', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (20, 'Laudo do exame', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (21, 'Monitorização', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (22, 'Passagem de sonda', 'Pass. sonda', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (23, 'Transporte', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (24, 'Transporte até a Ressonância', 'Transp. Ress.', 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (25, 'Triagem', null, 1);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (26, 'Trombectomia mecânica', 'Tromb. mec.', 1);

INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (27, 'Avaliação recepção do Paciente', 'Aval. recepção pac.', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (28, 'Preparo para cirurgia', 'Prep. cirurgia', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (29, 'Radiografias', null, 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (30, 'Cirurgia', null, 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (31, 'Limpeza  e esterilização', 'Limp. esterilização', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (32, 'Cuidados na SR', 'Cuidados SR', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (33, 'Consultas de rotina na internação', 'Cons. rotina intern.', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (34, 'Cuidados com paciente na internação', 'Cuidados pac. intern.', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (35, 'Transporte', null, 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (36, 'Análise de exames', 'Análise ex.', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (37, 'Procedimentos do pós operatório', 'Proc. pós-op.', 2);
INSERT INTO public.activities(id, name, short_name, technology_id) VALUES (38, 'Adm de medicamentos', 'Adm. meds.', 2);

SELECT setval('activities_id_seq', 38, true);

-- ****************************************
-- roles
-- ****************************************

INSERT INTO public.roles(id, name, short_name) VALUES (1, 'Médico Emergencista', 'Emergencista');
INSERT INTO public.roles(id, name, short_name) VALUES (2, 'Adminstrativo', 'Adm.');
INSERT INTO public.roles(id, name, short_name) VALUES (3, 'Técnico Radiologista', 'Téc. Radio');
INSERT INTO public.roles(id, name, short_name) VALUES (4, 'Médico intensivista', 'Intensivista');
INSERT INTO public.roles(id, name, short_name) VALUES (5, 'Residente Enfermagem', 'Res. Enferm.');
INSERT INTO public.roles(id, name, short_name) VALUES (6, 'Nutricionista', 'Nutri');
INSERT INTO public.roles(id, name, short_name) VALUES (7, 'Residente Fisioterapia', 'Res. Fisio');
INSERT INTO public.roles(id, name, short_name) VALUES (8, 'Fonoaudiologo', 'Fono');
INSERT INTO public.roles(id, name, short_name) VALUES (9, 'Farmaceutico', null);
INSERT INTO public.roles(id, name, short_name) VALUES (10, 'Psicólogo', null);
INSERT INTO public.roles(id, name, short_name) VALUES (11, 'Fisioterapeuta', 'Fisio');
INSERT INTO public.roles(id, name, short_name) VALUES (12, 'Assistente Social', null);
INSERT INTO public.roles(id, name, short_name) VALUES (13, 'Médico cirurgião', 'Cirurgião');
INSERT INTO public.roles(id, name, short_name) VALUES (14, 'Odontologista', 'Odonto');
INSERT INTO public.roles(id, name, short_name) VALUES (15, 'Médico Vascular', null);
INSERT INTO public.roles(id, name, short_name) VALUES (16, 'Médico Clínico', null);
INSERT INTO public.roles(id, name, short_name) VALUES (17, 'Médico emergencista', 'emergencista');
INSERT INTO public.roles(id, name, short_name) VALUES (18, 'Médico cardiologista', 'cardiologista');
INSERT INTO public.roles(id, name, short_name) VALUES (19, 'Médico anestesiologista', 'anestesiologista');
INSERT INTO public.roles(id, name, short_name) VALUES (20, 'Técnico Enfermagem', 'Téc. Enferm.');
INSERT INTO public.roles(id, name, short_name) VALUES (21, 'Médico Neurologista', 'Neuro');
INSERT INTO public.roles(id, name, short_name) VALUES (22, 'Médico Radiologista', 'Radiolog.');
INSERT INTO public.roles(id, name, short_name) VALUES (23, 'Médico Neurointervencionista (pode ser neurologista ou neurocirurgião)', 'Neurointervenc.');
INSERT INTO public.roles(id, name, short_name) VALUES (24, 'Médico Residente', 'Residente');
INSERT INTO public.roles(id, name, short_name) VALUES (25, 'Enfermeiro', null);

INSERT INTO public.roles(id, name, short_name) VALUES (26, 'Anestesista', null);
INSERT INTO public.roles(id, name, short_name) VALUES (27, 'enfermeiro', null);
INSERT INTO public.roles(id, name, short_name) VALUES (28, 'cirurgião', null);
INSERT INTO public.roles(id, name, short_name) VALUES (29, 'Assistente do cirurgião 1 ', 'Assist. 1');
INSERT INTO public.roles(id, name, short_name) VALUES (30, 'Assistente do cirurgião 2 ', 'Assist. 2');
INSERT INTO public.roles(id, name, short_name) VALUES (31, 'Radiologista', null);
INSERT INTO public.roles(id, name, short_name) VALUES (32, 'Tecnico de enfermagem', 'Tec. enferm.');
INSERT INTO public.roles(id, name, short_name) VALUES (33, 'Profissional de limpeza', null);
INSERT INTO public.roles(id, name, short_name) VALUES (34, 'Cardiologista', 'Cardio');
INSERT INTO public.roles(id, name, short_name) VALUES (35, 'Psiquiatra', null);
INSERT INTO public.roles(id, name, short_name) VALUES (36, 'Gastroenterologista', 'Gastro');
INSERT INTO public.roles(id, name, short_name) VALUES (37, 'Fisiatra', null);
INSERT INTO public.roles(id, name, short_name) VALUES (38, 'Neurologista', 'Neuro');
INSERT INTO public.roles(id, name, short_name) VALUES (39, 'Medicina Interna', 'Med. Interna');
INSERT INTO public.roles(id, name, short_name) VALUES (40, 'Outros profissionais médicos', null);

SELECT setval('roles_id_seq', 40, true);

-- ****************************************
-- health_institution_roles
-- ****************************************

INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 1);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 2);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 3);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 4);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 5);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 6);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 7);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 8);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 9);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 10);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 11);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 12);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 13);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 14);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 15);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 16);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 17);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 18);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 19);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 20);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 21);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 22);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 23);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 24);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (5, 25);

INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 26);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 27);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 28);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 29);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 30);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 31);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 32);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 33);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 34);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 35);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 36);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 37);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 38);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 39);
INSERT INTO public.health_institution_roles(health_institution_id, role_id) VALUES (1, 40);

-- ****************************************
-- role_activities
-- ****************************************

INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 1);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 1);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 1);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (16, 1);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (1, 1);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 2);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 2);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 2);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 2);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 3);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 3);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (9, 3);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 3);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 3);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (17, 3);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (19, 4);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 5);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 5);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 5);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 5);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (2, 5);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 6);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 6);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (22, 7);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 8);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 9);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 10);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (13, 11);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 12);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 13);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 13);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (16, 13);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (17, 13);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (19, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (4, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (5, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (6, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (7, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (8, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (9, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (10, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (11, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (12, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (13, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (14, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (15, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (16, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (17, 14);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (18, 14);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (19, 15);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 16);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 16);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (22, 16);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (22, 17);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 18);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 19);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (22, 20);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 21);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 21);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 21);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 21);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 22);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 23);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (20, 23);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 24);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 24);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (21, 25);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 25);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 25);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (22, 26);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (23, 26);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (24, 26);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (25, 26);

--
--

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 27);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (11, 27);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (6, 27);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 28);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 28);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 29);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (31, 29);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 29);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (26, 30);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 30);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (28, 30);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 30);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (30, 30);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 30);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 31);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 31);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 31);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (33, 31);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (26, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (28, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (30, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (11, 32);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (6, 32);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (26, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (28, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (30, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (11, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (6, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (33, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (34, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (35, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (36, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (37, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (38, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (39, 33);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (40, 33);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 34);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 35);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 35);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (26, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (28, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (30, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (34, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (35, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (36, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (37, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (38, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (39, 36);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (40, 36);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (28, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (29, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (30, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (34, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (35, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (36, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (37, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (38, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (39, 37);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (40, 37);

INSERT INTO public.role_activities(role_id, activity_id) VALUES (27, 38);
INSERT INTO public.role_activities(role_id, activity_id) VALUES (32, 38);
