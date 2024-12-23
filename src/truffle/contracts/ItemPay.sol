// SPDX-License-Identifier: MIT

pragma solidity >=0.8.18;

import './ItemSale.sol';

contract ItemPay {
    uint public priceInWei;
    uint public index;
    uint pricePaid;
    ItemSale parentContract;

    constructor(ItemSale _parentContract, uint _priceInWei, uint _itemIndex) {
        priceInWei = _priceInWei;
        index = _itemIndex;
        parentContract = _parentContract;
    }

    receive() external payable { 
        require(pricePaid == 0, "Item has already being paid for");
        require(msg.value == priceInWei , "item has to be paid for in full");

        pricePaid += msg.value;
        (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));  
        require(success, "transaction wasn't successful, reverting");
    }

    fallback() external payable { 
        
    }

}
