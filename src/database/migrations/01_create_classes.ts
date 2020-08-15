import Knex from 'knex';

// Quais funções ele usará
export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')  // Reflete alteração em todos lugares vinculados a esse ID
            .onDelete('CASCADE'); // Reflete alteração em todos lugares vinculados a esse ID
    });
};

// Em caso de problema, QUEBRE O VIDRO
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
};