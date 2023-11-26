// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Persons {
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
    mapping(uint => Person) private people;

    // Returns the person of specified ID
    function getPersonById(
        uint _id
    ) public view returns (Person memory person) {
        return people[_id];
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
        Person[] memory _people = new Person[](count - deletedCount);
        uint i = 0;

        for (uint j = 1; j <= count; j++) {
            Person memory _person = people[j];

            if (_person.isActive) {
                _people[i] = _person;
                i++;
            }
        }

        return _people;
    }

    // Add a Person to the array
    function addPerson(string memory _name, uint _age) external {
        count++;
        people[count] = Person(count, _name, _age, true);
    }

    // Updates a person
    function updatePersonById(
        uint _id,
        string memory _name,
        uint _age
    ) external {
        if (people[_id].isActive) {
            people[_id].name = _name;
            people[_id].age = _age;
        }
    }

    // Delete a Person from the array
    function deletePersonById(uint _id) external {
        // Set all of its values to "default"
        // then "soft-deletes" the register
        people[_id].id = 0;
        people[_id].name = "";
        people[_id].age = 0;
        people[_id].isActive = false;

        deletedCount++;
    }
}
