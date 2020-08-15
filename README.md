# Proffy-API

API para servir ao [projeto Proffy](https://github.com/cesardka/proffy), registrando e retornando visitas, registros de classes de aula, horários, professores...

Esse projeto faz parte da maratona Next Level Week #2 oferecida pela [Rocketseat](https://github.com/Rocketseat) entre

## Rodando o projeto

### Pré-requisitos

É necessario ter instalado:

- [Node.js](https://nodejs.org/)
- NPM ([Yarn v1](https://classic.yarnpkg.com/lang/en/) recomendado)
- [Git](https://git-scm.com/)

### Iniciando o projeto

Instale as dependências com
```sh
npm install
```
ou
```sh
yarn
```
e inicie o projeto com
```sh
yarn start
```

## Rotas disponíveis

GET /connections
- Listar total de conexões já realizadas ao Proffy

POST /connections
- Adiciona nova conexão a um usuário
```
{ "user_id": "`id_do_usuário`"}
```

GET /classes
- Listar aulas
- Filtrar por matéria, dia da semana e horário via `parâmetros de query`
- subject (nome da matéria)
- week_day (dias da semana, de 0 = domingo, a 6 = sábado)
- horário (formato `"HH:mm"`)

POST /classes
- Inserir uma aula
-
```
{
	"name": "`Nome do professor`",
	"avatar": "`URL da imagem de avatar`",
	"whatsapp": "`Número de whatsapp com DDI e DDD`",
	"bio": "`Descrição do professor`",
	"subject": "`Matéria que leciona`",
	"cost": `Valor por hora/aula`,
	"schedule": [
		{
            "week_day": "`Dia da semana (de 0 a 6, partindo de domingo)`",
            "from": "`Início da aula`",
            "to": "`Término da aula`"
        }
	]
}
```