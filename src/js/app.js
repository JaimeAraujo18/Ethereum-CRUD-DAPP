App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    getAccount: async function () {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    alert('Por favor conecte-se ao MetaMask.');
                } else {
                    console.error(err);
                }

                return;
            });

        const account = accounts[0];
        $("#accountAddress").html("Sua conta: " + account);

        App.initWeb3();
    },

    initWeb3: function () {
        // TODO: refactor conditional
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.

            App.web3Provider = ethereum;
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function () {
        // caminho pro Persons.json (ABI, objeto do contrato, compilado pelo framework)
        $.getJSON("Persons.json", function (persons) {
            console.warn(persons);

            // Instantiate a new truffle contract from the artifact
            App.contracts.Persons = TruffleContract(persons);

            // Connect provider to interact with contract
            App.contracts.Persons.setProvider(App.web3Provider);

            App.listenForEvents();

            return App.render();
        });
    },

    // Listen for events emitted from the contract
    listenForEvents: function () {
        App.contracts.Persons.deployed().then(function (instance) {
            // Restart Chrome if you are unable to receive this event
            // This is a known issue with Metamask
            // https://github.com/MetaMask/metamask-extension/issues/2393
            // instance.changedEvent({}, {
            //     fromBlock: 0,
            //     toBlock: 'latest'
            // }).watch(function (error, event) {
            //     console.log("event triggered", event)
            //     // Reload when a new vote is recorded
            //     App.render();
            // });
        });
    },

    render: function () {
        let personsInstance,
            loader = $("#loader"),
            content = $("#content");

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Sua conta: " + account);
            }
        });

        // Load contract data
        App.contracts.Persons.deployed().then(function (instance) {
            personsInstance = instance;

            // metodo do contrato q retorna um array de pessoas
            return personsInstance.getPeopleCount();
        }).then(async function (peopleCount) {
            let peopleResult = $("#peopleResults");
            peopleResult.empty();

            // if (people.length) {
            for (let i = 1; i <= peopleCount; i++) {
                let person = await personsInstance.persons(i);

                console.warn('person: ', person);
                if (person[3]) {
                    // Render candidate Result
                    let personTemplate = "<tr><th class='id'>" + person[0] + "</th><td class='name'>" + person[1] + "</td><td class='age'>" + person[2] + "</td><td><a onClick='App.edit(this)'>Editar</a></td><td><a onClick='App.delete(this)'>Excluir</a></td></tr>"
                    peopleResult.append(personTemplate);
                }
            }
            // }

            loader.hide();
            content.show();
        }).catch(function (error) {
            console.warn(error);
        });
    },

    edit: function (a) {
        let row = $(a).closest('tr'),
            personId = row.find('.id').text(),
            personName = row.find('.name').text(),
            personAge = row.find('.age').text();

        $('#personId').val(personId);
        $('#personName').val(personName);
        $('#personAge').val(personAge);
    },

    delete: function (a) {
        let row = $(a).closest('tr'),
            personId = row.find('.id').text();
        console.warn({ personId });

        App.contracts.Persons.deployed().then(async function (instance) {
            if ($.isNumeric(personId)) {
                await instance.deletePersonById(personId, { from: App.account });
            }

            App.render();
        }).catch(function (err) {
            console.error(err);
        });
    },


    //on form submit function
    savePerson: function () {
        let personId = $('#personId').val(),
            personName = $('#personName').val(),
            personAge = $('#personAge').val();

        console.warn({ personId, personName, personAge });

        App.contracts.Persons.deployed().then(async function (instance) {
            if ($.isNumeric(personId)) {
                await instance.updatePersonById(personId, personName, personAge, { from: App.account });
            } else {
                await instance.addPerson(personName, personAge, { from: App.account });
            }

            $('form input').val('');
            App.render();
        }).catch(function (err) {
            console.error(err);
        });
    }
};

$(function () {
    // $(window).load(function () {
    //     App.init();
    // });
});
