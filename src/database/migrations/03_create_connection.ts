import Knex from 'knex';

// Quais funções ele usará
export async function up(knex: Knex) {
    return knex.schema.createTable('connection', table => {
        table.increments('id').primary();

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
};

// Em caso de problema, QUEBRE O VIDRO
export async function down(knex: Knex) {
    return knex.schema.dropTable('connection');
};