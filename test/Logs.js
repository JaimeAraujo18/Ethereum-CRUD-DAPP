const { log } = require('console');
var crypto = require('crypto');

function sha256(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}

let Logs = artifacts.require('./Logs.sol'),
    Persons = artifacts.require('./Persons.sol');

contract('Logs', function () {
    let person;

    const hashAntes = sha256('{}');
    const hashDepois = sha256('{"nome":"Jaime"}');

    it('Inicializa sem nenhum log', function () {
        return Logs.deployed().then(function (instance) {
            return instance.getLogsCount();
        }).then(function (count) {
            assert.equal(count, 0);
        });
    });

    it('Adiciona uma log e valida o ultimo log inserido', function () {
        return Logs.deployed().then(async function (instance) {
            person = await Persons.deployed().then(instance => instance.getLastPerson());
            console.log('person:', person);

            await instance.addLog(person.id, hashAntes, hashDepois);

            return instance.getLastLog();
        }).then(function (log) {
            console.warn('addLog -> getLastLog: ', log);
            console.log('data e hora da alteração: ', new Date(log[2] * 1000)); // timestamp

            assert.equal(log[0], 1, 'Não possui o ID correto (inicia em 1)');
            assert.equal(log[1], person.id, 'Não possui o PersonId correto');

            // TIMESTAMP (nao vai testar) assert.equal(log[2], hash, 'Não possui a IDADE correta');
            assert.equal(log[3], hashAntes, 'Não possui o hashBefore correto');
            assert.equal(log[4], hashDepois, 'Não possui o hashAfter correto');
            // assert.equal(log[5], , 'Não possui o hashAfter correto');
        });
    });
});