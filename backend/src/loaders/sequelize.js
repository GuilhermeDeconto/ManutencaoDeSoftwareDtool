import Sequelize from "sequelize"
import config from "../config"

// models
import { setup as setupHealthInstitution } from "../models/HealthInstitutionDAO"
import { setup as setupTechnology } from "../models/TechnologyDAO"
import { setup as setupActivity } from "../models/ActivityDAO"
import { setup as setupRole } from "../models/RoleDAO"
import { setup as setupExecution } from "../models/ExecutionDAO"
import { setup as setupRoleActivity } from "../models/RoleActivityDAO"

// relations
import { setup as setupRelations } from "../models/relations"

export default async () => {
  const sequelize = new Sequelize(config.databaseURL, {
    dialect: "postgres",
    define: {
      timestamps: false,
      underscored: true,
    },
  })

  // models
  setupHealthInstitution(sequelize)
  setupTechnology(sequelize)
  setupActivity(sequelize)
  setupRole(sequelize)
  setupRoleActivity(sequelize)
  setupExecution(sequelize)

  // relations
  setupRelations()

  await sequelize.sync()

  // role_activities + executions: tem de ser feita manualmente e depois da chamada ao sync,
  // porque o sequelize não suporta FKs compostas (https://github.com/sequelize/sequelize/issues/311)
  // query baseada em: https://stackoverflow.com/a/45232288/10247731
  await sequelize.query(`
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT * FROM information_schema.constraint_column_usage
      WHERE constraint_name = 'role_activities_fkey'
    )
    THEN
      ALTER TABLE executions
        ADD CONSTRAINT role_activities_fkey
        FOREIGN KEY (role_id, activity_id)
        REFERENCES role_activities (role_id, activity_id)
        ON UPDATE CASCADE ON DELETE CASCADE;
    END IF;
  END $$;
  `)

  // criar função e aggregate para obter a mediana dos valores de uma coluna
  // referência: https://wiki.postgresql.org/wiki/Aggregate_Median
  await sequelize.query(`
  CREATE OR REPLACE FUNCTION _final_median(anyarray) RETURNS float8 AS $$ 
    WITH q AS
    (
      SELECT val
      FROM unnest($1) val
      WHERE VAL IS NOT NULL
      ORDER BY 1
    ),
    cnt AS
    (
      SELECT COUNT(*) AS c FROM q
    )
    SELECT AVG(val)::float8
    FROM 
    (
      SELECT val FROM q
      LIMIT  2 - MOD((SELECT c FROM cnt), 2)
      OFFSET GREATEST(CEIL((SELECT c FROM cnt) / 2.0) - 1,0)
    ) q2;
  $$ LANGUAGE SQL IMMUTABLE;

  CREATE OR REPLACE AGGREGATE median(anyelement) (
    SFUNC=array_append,
    STYPE=anyarray,
    FINALFUNC=_final_median,
    INITCOND='{}'
  );
  `)
}
