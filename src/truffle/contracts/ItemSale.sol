// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import "./ItemPay.sol";
import "./Owner.sol";

contract ItemSale is Owner {

    enum SupplyChainState{created, paid, delivered}
    struct S_item {
        ItemPay itemPay;
        string identifier;
        ItemSale.SupplyChainState state;
    }

    mapping (uint => S_item) public items;
    uint itemIndex;

    event SupplyChainStep(uint itemIndex, uint step, address itemAddress);


    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner {
        ItemPay _item = new ItemPay(this, _itemPrice, itemIndex);
        items[itemIndex].itemPay = _item;
        items[itemIndex].identifier = _identifier;
        items[itemIndex].state = SupplyChainState.created;
        itemIndex++;
        emit SupplyChainStep(itemIndex, uint(items[itemIndex].state), address(_item));
    }

    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex].state == SupplyChainState.created, "item is further in the chain");
        items[_itemIndex].state = SupplyChainState.paid;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex].state), address(items[_itemIndex].itemPay));
    }

    function deliverItem(uint _itemIndex) public {
        require(items[_itemIndex].state == SupplyChainState.paid, "item is further in the chain");
        items[_itemIndex].state = SupplyChainState.delivered;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex].state), address(items[_itemIndex].itemPay));
    }


    
}

