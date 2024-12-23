import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ItemSale from './contracts/ItemSale';


const MyContract = async () => {
  // const [inputValue, setInputValue] = useState(0)
  const [identifier, setIdentifier] = useState("");
  const [itemCost, setItemCost] = useState(0);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        let _web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(_web3);
        
        const accounts = await _web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await _web3.eth.net.getId();
        const _contract = new _web3.eth.Contract(ItemSale.abi, "0xCEEaF6EdB07e38e344207Ad2894aF8B4215eeB60");
        setContract(_contract);

        console.log(_web3, accounts, _contract, networkId)
      } else {
        alert("Please install MetaMask to interact with the Ethereum network.");
      }
    };
    
    loadWeb3();

  }, []);

  const createItem = async () => {

    try {
      await contract.methods.createItem(identifier, itemCost).send({ from: account });
    
    } catch (error) {
      console.log(error)
    }
  }
    

  const handleChange = (event) => {
    setIdentifier(event.target.value);
  };

    return (
      
      <div>
        <h1>Supply Chain Project</h1>
        <div>
          <input
            type="text"
            placeholder="Enter item id"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
          
        <div>
          Cost in wei: <input
            type="number"
            placeholder="Enter item cost"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
          />

          <button onClick={createItem}>
            Add Item
          </button>
        </div>
      </div>
    );

  
}

export default MyContract;

