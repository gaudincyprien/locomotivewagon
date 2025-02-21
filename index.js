let web3;
let LocomotiveContract;
const contractAddress = "0x9c62311E2B81AE323716b9783D08DfDBE1802DD4"; // Remplacez par l'adresse de votre contrat
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newLocomotiveCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "LocomotiveUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newLocomotiveCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newWagonCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "LocomotiveWagonUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newWagonCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "WagonUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "addLocomotive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wagon",
				"type": "uint256"
			}
		],
		"name": "addWagon",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTransactionHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "locomotiveCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "wagonCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct LocomotiveContract.TransactionHistory[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "locomotiveCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "removeLocomotive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "removeWagon",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_locomotiveCount",
				"type": "uint256"
			}
		],
		"name": "setLocomotive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_wagonCount",
				"type": "uint256"
			}
		],
		"name": "setWagon",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactionHistory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "locomotiveCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wagonCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wagonCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.onload = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable(); // Demande l'accès au compte Ethereum
      initializeContract();
    } catch (error) {
      console.error("L'utilisateur a rejeté la demande d'accès au compte Ethereum.");
    }
  } else {
    alert("Veuillez installer MetaMask pour interagir avec la blockchain.");
  }
};

const initializeContract = () => {
  LocomotiveContract = new web3.eth.Contract(contractABI, contractAddress);
  showLocomotiveHistory(); // Afficher l'historique des transactions au chargement de la page
};

async function setLocomotive() {
  const locomotiveCount = document.getElementById("locomotiveInput").value;

  if (locomotiveCount === "") {
	alert("Veuillez saisir le nombre de locomotives.");
	return;
  }
  
  if (locomotiveCount < 0) {
    alert("Le nombre de locomotives ne peut pas être négatif.");
    return;
  }

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
    await LocomotiveContract.methods.setLocomotive(locomotiveCount).send({ from: account });
	document.getElementById("locomotiveInput").value = ''
    alert("Le nombre de locomotives a été mis à jour avec succès.");
    showLocomotiveHistory(); // Actualiser l'historique après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour des locomotives:", error);
  }
}

async function setWagon() {
  const wagonCount = document.getElementById("wagonInput").value;

  if (wagonCount === "") {
	alert("Veuillez saisir le nombre de wagon.");
	return;
  }

  if (wagonCount < 0) {
    alert("Le nombre de wagons ne peut pas être négatif.");
    return;
  }

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
    await LocomotiveContract.methods.setWagon(wagonCount).send({ from: account });
	document.getElementById("wagonInput").value = ''
    alert("Le nombre de wagons a été mis à jour avec succès.");
    showLocomotiveHistory(); // Actualiser l'historique après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour des wagons:", error);
  }
}

async function addLocomotive() {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
    await LocomotiveContract.methods.addLocomotive().send({ from: account });
    alert("Une locomotive a été ajoutée.");
    showLocomotiveHistory(); // Actualiser l'historique après ajout
  } catch (error) {
    console.error("Erreur lors de l'ajout de la locomotive:", error);
  }
}

async function removeLocomotive() {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const count = await LocomotiveContract.methods.locomotiveCount().call();

  if (count ==0){
	alert("Aucune locomotive n'est disponible")
	return
  }

  try {
    await LocomotiveContract.methods.removeLocomotive().send({ from: account });
    alert("Une locomotive a été supprimée.");
    showLocomotiveHistory(); // Actualiser l'historique après suppression
  } catch (error) {
    console.error("Erreur lors de la suppression de la locomotive:", error);
  }
}

async function addWagon() {
  const wagonCount = document.getElementById("wagonInputAdd").value;

  if (wagonCount === "") {
	alert("Veuillez saisir le nombre de wagon.");
	return
  }

  if (wagonCount < 0) {
    alert("Le nombre de wagons ne peut pas être négatif.");
    return;
  }

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  try {
    await LocomotiveContract.methods.addWagon(wagonCount).send({ from: account });
	document.getElementById("wagonInputAdd").value = ''
    alert("Le nombre de wagons a été mis à jour avec succès.");
    showLocomotiveHistory(); // Actualiser l'historique après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour des wagons:", error);
  }
}

async function removeWagon() {
	const wagonCount = document.getElementById("wagonInputDelete").value;

	if (wagonCount === "") {
		alert("Veuillez saisir le nombre de wagon.");
		return
	}

	if (wagonCount < 0) {
	  alert("Le nombre de wagons ne peut pas être négatif.");
	  return;
	}

	const count = await LocomotiveContract.methods.wagonCount().call();

	if (count ==0){
	  alert("Aucune wagon n'est disponible")
	  return
	}

	if (count <  wagonCount){
		alert("Pas possible de supprimer plus de wagon que le nombre de wagon disponible")
		return
	}
  
	const accounts = await web3.eth.getAccounts();
	const account = accounts[0];
  
	try {
	  await LocomotiveContract.methods.removeWagon(wagonCount).send({ from: account });
	  document.getElementById("wagonInputDelete").value = ''
	  alert("Le nombre de wagons a été mis à jour avec succès.");
	  showLocomotiveHistory(); // Actualiser l'historique après la mise à jour
	} catch (error) {
	  console.error("Erreur lors de la mise à jour des wagons:", error);
	}




  try {
    await LocomotiveContract.methods.removeWagon().send({ from: account });
    alert("Un wagon a été supprimé.");
    showLocomotiveHistory(); // Actualiser l'historique après suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du wagon:", error);
  }
}

async function validate(){

	const wagonCount = 10
	const locomotiveCount = 100

	const accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	try {
		await LocomotiveContract.methods.setLocomotiveWagon(locomotiveCount, wagonCount).send({ from: account });
	} catch (error) {
		console.error("Erreur lors de l'envoi des informations à la blockchain:", error);
	}
	
}

async function showLocomotiveHistory() {
	try {
	  const history = await LocomotiveContract.methods.getTransactionHistory().call();
	  const historyList = document.getElementById("transactionsHistory");
	  historyList.innerHTML = "";
  
	  history.forEach(transaction => {
		const transactionItem = document.createElement("li");
  
		// Créer un élément <p> pour chaque détail
		const locomotiveText = document.createElement("p");
		locomotiveText.textContent = `Locomotives : ${transaction.locomotiveCount}`;
  
		const wagonText = document.createElement("p");
		wagonText.textContent = `Wagons : ${transaction.wagonCount}`;
  
		const dateText = document.createElement("p");

		let timestamp = Number(transaction.timestamp);
		let date = new Date(timestamp * 1000).toLocaleString();
		dateText.textContent = `Date : ${date}`;
		dateText.classList.add("timestamp");
  
		// Ajouter les détails dans l'élément de transaction
		transactionItem.appendChild(locomotiveText);
		transactionItem.appendChild(wagonText);
		transactionItem.appendChild(dateText);
  
		// Ajouter l'élément à la liste
		historyList.appendChild(transactionItem);
	  });
	} catch (error) {
		console.error("Erreur lors de la récupération de l'historique des transactions:", error);
	  }
  }

