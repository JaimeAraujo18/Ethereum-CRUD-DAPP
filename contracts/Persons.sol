// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Logs.sol";

contract Persons {
    Logs logs = Logs(msg.sender);

    // Store Persons count
    uint private count;

    // Store deleted persons count
    uint private deletedCount;

    // Model of Person
    struct Person {
        uint id;
        string name;
        uint age;
        bool isActive;
    }

    // Array of persons ID => Person
    mapping(uint => Person) public persons;

    // Returns the person of specified ID
    function getPersonById(
        uint _id
    ) public view returns (Person memory person) {
        return persons[_id];
    }

    // Returns the last person added to the array
    function getLastPerson() external view returns (Person memory) {
        return getPersonById(count);
    }

    // Returns the count
    function getPeopleCount() external view returns (uint) {
        return count;
    }

    // Returns the non-deleted persons
    function getPeople() external view returns (Person[] memory) {
        Person[] memory _persons = new Person[](count - deletedCount);
        uint i = 0;

        for (uint j = 1; j <= count; j++) {
            Person memory _person = persons[j];

            if (_person.isActive) {
                _persons[i] = _person;
                i++;
            }
        }

        return _persons;
    }

    // Add a Person to the array
    function addPerson(string memory _name, uint _age) external {
        count++;
        persons[count] = Person(count, _name, _age, true);

        // logs.addLog(count, "", _sha256(persons[count]));
    }

    // Updates a person
    function updatePersonById(
        uint _id,
        string memory _name,
        uint _age
    ) external {
        if (persons[_id].isActive) {
            // Person memory _personBefore = persons[_id];

            persons[_id].name = _name;
            persons[_id].age = _age;

            // logs.addLog(_id, _sha256(_personBefore), _sha256(persons[_id]));
        }
    }

    // Delete a Person from the array
    function deletePersonById(uint _id) external {
        // Set all of its values to "default"
        // then "soft-deletes" the register
        if (persons[_id].isActive) {
            // logs.addLog(_id, _sha256(persons[_id]), "");

            delete persons[_id];

            deletedCount++;
        }
    }

    function _sha256(
        Person memory _person
    ) internal pure returns (string memory) {
        return bytes32ToString(sha256(abi.encode(_person)));
    }

    function bytes32ToString(
        bytes32 _bytes32
    ) internal pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }

        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }

        return string(bytesArray);
    }
}
