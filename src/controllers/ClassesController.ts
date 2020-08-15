import { Request, Response } from 'express';
import db                    from "../database/connection";
import convertHourToMinutes  from "../utils/convertHourToMinutes";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
};

export default class ClassesController {
    // Retorna todas as classes numa faixa de horário e dia da semana para uma matéria
    async index(request: Request, response: Response) {
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject  = filters.subject as string;
        const time     = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes',
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.send(classes);
    }

    // Cria novo usuário, matéria e cronograma para essa matéria
    async create(request: Request, response: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
        const trx = await db.transaction();
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = insertedUsersIds[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[0];
            const class_schedule = schedule.map((schedule: ScheduleItem) => {
                return {
                    class_id,
                    week_day: schedule.week_day,
                    from: convertHourToMinutes(schedule.from),
                    to: convertHourToMinutes(schedule.to),
                };
            });

            await trx('class_schedule').insert(class_schedule);

            await trx.commit();
        } catch (err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({ error: 'Deu pau, juvenal'}).send();
        }

        return response.status(201).send();
    }
}