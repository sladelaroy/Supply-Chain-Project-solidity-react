import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ItemSale from './truffle/build/contracts/ItemSale';
import ItemPay from './truffle/build/contracts/ItemPay';
// import './App.css';
// import MyContract from './myContract.js';

export let itemsAvailable = [];


  




function App() {

  const [items, setItems] = useState([])
  const [identifier, setIdentifier] = useState("");
  const [itemCost, setItemCost] = useState(0);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [itemAddress, setItemAddress] = useState(null);
  const [events, setEvents] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const newItems = [];

  const MyContract = async () => {
    // const [inputValue, setInputValue] = useState(0)

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        let _web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(_web3);
        
        const accounts = await window.ethereum.getAccounts()
        setAccount(accounts);

        const thisNetworkId = await _web3.eth.net.getId();
        setNetworkId(thisNetworkId);
        const _contract = new _web3.eth.Contract(ItemSale.abi, ItemSale.networks[thisNetworkId].address);
        setContract(_contract);




        console.log(_web3, accounts, _contract, thisNetworkId, ItemSale.networks[thisNetworkId].address)
      } else {
        alert("Please install MetaMask to interact with the Ethereum network.");
      }
    };
    
    loadWeb3();

  }, []);
  // const handleChange = (event) => {
  //   setIdentifier(event.target.value);
  // };
  
  };

  MyContract();

  

  
  const createItem = async () => {

    try {
      let result = await contract.methods.createItem(identifier, itemCost).send({ from: account[0] });
      let theItemAddress = result.events.SupplyChainStep.returnValues.itemAddress;
      setItemAddress(theItemAddress);
      console.log(result);
      console.log(theItemAddress);
      
      // listenForEvents();
      

      
      newItems.push(
        {
          itemId: identifier,
          itemCost,
          itemAddress: theItemAddress
        }
      );

      setItems(newItems);

      itemsAvailable = newItems;
      
      console.log(itemsAvailable);


    } catch (error) {
      console.log(error)
    }
  }
  
  
  const listenForEvents = async () => {
    // let contractInstance = new web3.eth.Contract(ItemSale.abi, "0xCEEaF6EdB07e38e344207Ad2894aF8B4215eeB60")
      contract.events.SupplyChainStep().on('data', async (event) => {
        // let returnedEvents = JSON.stringify(event);
        // setEvents(returnedEvents);
        console.log(event)
        // let thisItemAddress = event.returnValues.itemAddress;
        // setItemAddress(thisItemAddress)
        // console.log(thisItemAddress);
      })
  }
  
 
  return (
      <div>
        <h2>Supply Chain Project</h2>
        <div>
          identifier: 
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

          <div>
            <h4>Items Available:</h4>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <span>ItemId: <strong>{item.itemId}</strong></span> <span> Cost: <strong>{item.itemCost}</strong></span> <span> Item Address: <strong>{item.itemAddress}</strong></span>
                </li>
              ))}
            </ul> 

            <button onClick={listenForEvents}> 
              listenForEvents
              </button><p>{events}</p>
          </div>
        </div>
      </div>
  )

}

export default App;
