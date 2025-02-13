import Knex from 'knex';

// Quais funções ele usará
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

// Em caso de problema, QUEBRE O VIDRO
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
};