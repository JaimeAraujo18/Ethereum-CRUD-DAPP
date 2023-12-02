// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Logs {
    // Store Logs count
    uint private count;
    uint private lastInsertId;

    // Model of Log
    struct Log {
        uint id;
        uint personId;
        uint timestamp;
        string hashBefore;
        string hashAfter;
        address userAddress;
    }

    // Array of logs ID => Log
    mapping(uint => Log) private logs;

    // Returns the logs of specified PersonID
    function getLogsByPersonId(
        uint _personId
    ) public view returns (Log[] memory log) {
        Log[] memory _logs = new Log[](count);
        uint i = 0;

        for (uint j = 1; j <= count; j++) {
            Log memory _log = logs[j];

            if (_log.personId == _personId) {
                _logs[i] = _log;
                i++;
            }
        }

        return _logs;
    }

    // Returns the last log
    function getLogById(uint _id) public view returns (Log memory log) {
        return logs[_id];
    }

    // Returns the last log added to the array
    function getLastLog() external view returns (Log memory) {
        return getLogById(count);
    }

    // Returns the count
    function getLogsCount() external view returns (uint) {
        return count;
    }

    // Returns the non-deleted logs
    function getLogs() external view returns (Log[] memory) {
        Log[] memory _logs = new Log[](count);
        uint i = 0;

        for (uint j = 1; j <= count; j++) {
            _logs[i] = logs[j];
            i++;
        }

        return _logs;
    }

    // Add a Log to the array
    function addLog(
        uint _personId,
        string memory _hashBefore,
        string memory _hashAfter
    ) external {
        count++;
        logs[count] = Log(
            count,
            _personId,
            block.timestamp,
            _hashBefore,
            _hashAfter,
            msg.sender
        );
    }
}
