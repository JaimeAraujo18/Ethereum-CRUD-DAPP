let Persons = artifacts.require('./Persons.sol');

contract('Persons', function () {
    it('Inicializa sem nenhuma pessoa', function () {
        return Persons.deployed().then(function (instance) {
            return instance.getPeopleCount();
        }).then(function (count) {
            assert.equal(count, 0);
        });
    });

    it('Adiciona uma pessoa e valida a ultima pessoa inserida', function () {
        return Persons.deployed().then(async function (instance) {
            await instance.addPerson('Jaime', 23);

            return instance.getLastPerson();
        }).then(function (person) {
            console.warn('addPerson -> getLastPerson: ', person);

            assert.equal(person[0], 1, 'Não possui o ID correto (inicia em 1)');
            assert.equal(person[1], 'Jaime', 'Não possui o NOME correto');
            assert.equal(person[2], 23, 'Não possui a IDADE correta');
            assert.equal(person[3], true, 'Não possui isActive correto');
        });
    });

    it('Valida os dados da pessoa com ID 1', function () {
        return Persons.deployed().then(function (instance) {
            return instance.getPersonById(1);
        }).then(function (person) {
            console.warn('getPersonById: ', person);

            assert.equal(person[0], 1, 'Não possui o ID correto (inicia em 1)');
            assert.equal(person[1], 'Jaime', 'Não possui o NOME correto');
            assert.equal(person[2], 23, 'Não possui a IDADE correta');
            assert.equal(person[3], true, 'Não possui isActive correto');
        });
    });

    it('Adiciona uma nova pessoa e checa o retorno do getPeople (length)', function () {
        return Persons.deployed().then(async function (instance) {
            await instance.addPerson('Eduardo', 25);

            return instance.getPeople();
        }).then(function (people) {
            console.warn('getPeople: ', people);

            assert.equal(people.length, 2, 'Possui 2 registro no array');

            assert.equal(people[0][0], 1, 'people[0] não possui o ID correto (inicia em 1)');
            assert.equal(people[0][1], 'Jaime', 'people[0] não possui o NOME correto');
            assert.equal(people[0][2], 23, 'people[0] não possui a IDADE correta');
            assert.equal(people[0][3], true, 'people[0] não possui isActive correto (true)');

            assert.equal(people[1][0], 2, 'people[1] não possui o ID correto (inicia em 1)');
            assert.equal(people[1][1], 'Eduardo', 'people[1] não possui o NOME correto');
            assert.equal(people[1][2], 25, 'people[1] não possui a IDADE correta');
            assert.equal(people[1][3], true, 'people[1] não possui isActive correto (true)');
        });
    });

    it('Valida a atualização dos dados', function () {
        return Persons.deployed().then(async function (instance) {
            await instance.updatePersonById(1, 'Julio', 54)

            return instance.getPeople();
        }).then(function (people) {
            console.warn('updatePersonById -> getPeople: ', people);

            assert.equal(people.length, 2, 'Possui 2 registro no array');

            assert.equal(people[0][0], 1, 'people[0] não possui o ID correto (inicia em 1)');
            assert.equal(people[0][1], 'Julio', 'people[0] não possui o NOME correto');
            assert.equal(people[0][2], 54, 'people[0] não possui a IDADE correta');
            assert.equal(people[0][3], true, 'people[0] não possui isActive correto (true)');

            assert.equal(people[1][0], 2, 'people[1] não possui o ID correto (inicia em 1)');
            assert.equal(people[1][1], 'Eduardo', 'people[1] não possui o NOME correto');
            assert.equal(people[1][2], 25, 'people[1] não possui a IDADE correta');
            assert.equal(people[1][3], true, 'people[1] não possui isActive correto (true)');
        });
    });

    it('Valida a deleção do registro ', function () {
        return Persons.deployed().then(async function (instance) {
            await instance.deletePersonById(1);

            return instance.getPeople();
        }).then(function (people) {
            console.warn('deletePersonById -> getPeople: ', people);

            assert.equal(people.length, 1, 'Não possui 1 registro no array');

            assert.equal(people[0][0], 2, 'people[0] não possui o ID correto (inicia em 1)');
            assert.equal(people[0][1], 'Eduardo', 'people[0] não possui o NOME correto');
            assert.equal(people[0][2], 25, 'people[0] não possui a IDADE correta');
            assert.equal(people[0][3], true, 'people[0] não possui isActive correto (true)');
        });
    });
});