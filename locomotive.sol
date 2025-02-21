// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LocomotiveContract {
    uint public locomotiveCount;
    uint public wagonCount;

    struct TransactionHistory {
        uint locomotiveCount;
        uint wagonCount;
        uint timestamp;
    }

    // Liste des historiques de transaction
    TransactionHistory[] public transactionHistory;

    // Ajouter une locomotive
    function addLocomotive() public {
        locomotiveCount++;
        emit LocomotiveUpdated(locomotiveCount, block.timestamp);
        recordTransaction();
    }

    // Retirer une locomotive
    function removeLocomotive() public {
        require(locomotiveCount > 0, "No locomotives available.");
        locomotiveCount--;
        emit LocomotiveUpdated(locomotiveCount, block.timestamp);
        recordTransaction();
    }

    // Ajouter des wagons
    function addWagon(uint wagon) public {
        wagonCount = wagonCount + wagon;
        emit WagonUpdated(wagonCount, block.timestamp);
        recordTransaction();
    }

    // Retirer un wagon
    function removeWagon() public {
        require(wagonCount > 0, "No wagons available.");
        wagonCount--;
        emit WagonUpdated(wagonCount, block.timestamp);
        recordTransaction();
    }

    // Mettre à jour le nombre de locomotives
    function setLocomotive(uint _locomotiveCount) public {
        locomotiveCount = _locomotiveCount;
        emit LocomotiveUpdated(locomotiveCount, block.timestamp);
        recordTransaction();
    }

    // Enregistrer l'historique
    function recordTransaction() private {
        transactionHistory.push(TransactionHistory({
            locomotiveCount: locomotiveCount,
            wagonCount: wagonCount,
            timestamp: block.timestamp
        }));
    }

    // Récupérer l'historique des locomotives
    function getTransactionHistory() public view returns (TransactionHistory[] memory) {
        return transactionHistory;
    }

    // Events
    event LocomotiveUpdated(uint newLocomotiveCount, uint timestamp);
    event WagonUpdated(uint newWagonCount, uint timestamp);
}
