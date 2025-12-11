import { log } from "console";
import { stockMarket } from "./data.js";
import  input from "analiza-sync";

export function searchStock(identifier) {
  let newstocks = [];
  for (let index = 0; index < stockMarket.stocks.length; index++) {
    if (
      stockMarket.stocks[index].id == identifier ||
      stockMarket.stocks[index].name == identifier
    ) {
      newstocks.push(stockMarket.stocks[index]);
    }
  }
  if (newstocks.length == 0) {
    return [newstocks, identifier];
  }
  return newstocks;
}

export function filterStocksByPrice(givenPrice, above) {
  let newstocks = [];
  if (above) {
    for (let index = 0; index < stockMarket.stocks.length; index++) {
      if (stockMarket.stocks[index].currentPrice > givenPrice) {
        newstocks.push(stockMarket.stocks[index]);
      }
    }
  }
  if (!above) {
    for (let index = 0; index < stockMarket.stocks.length; index++) {
      if (stockMarket.stocks[index].currentPrice < givenPrice) {
        newstocks.push(stockMarket.stocks[index]);
      }
    }
  }else{console.log("You didn't make the right choice");
  }
  if (newstocks.length == 0) {
    return [newstocks, givenPrice];
  }
  return newstocks;
}

export function OperateOnStock(operation, identifier) {
  if (operation == "buy") {
    let sum = 0;
    for (let index = 0; index < stockMarket.stocks.length; index++) {
      if (
        stockMarket.stocks[index].id == identifier ||
        stockMarket.stocks[index].name == identifier
      ) {
        sum += 1;
        let  stock = stockMarket.stocks[index]
        let number_of_units = input(
          "Please, how many units are you interested in buying?"
        );
        while (stockMarket.stocks[index].availableStocks > number_of_units) {
          console.log(
            `These are the number of units left: ${stockMarket.stocks[index].availableStocks} Please choose a matching number`
          );
          number_of_units = input("Please, how many units are you interested in buying?"
          );
        }
        stock.availableStocks -= number_of_units
        stock.previousPrices.push(stockMarket.stocks[index].currentPrice)
        stock.currentPrice *= 1.05
        stockMarket.lastUpdated = new Date()
        for (let index = 0; index < stockMarket.stocks.length; index++) {
           if (stock.category == stockMarket.stocks[index].category){
            stockMarket.stocks[index].category *= 1.01
           }
        }
      }
    }
    if (sum == 0) {
      console.log("The ID you provided was not found.");
    }
  } else if (operation == "sell") {
    let sum = 0;
    for (let index = 0; index < stockMarket.stocks.length; index++) {
      if (
        stockMarket.stocks[index].id == identifier ||
        stockMarket.stocks[index].name == identifier
      ) {
        sum += 1;
        let  stock = stockMarket.stocks[index]
        let number_of_units = input(
          "Please, how many units are you interested in selling?"
        );
        stock.availableStocks += number_of_units
        stock.previousPrices.push(stockMarket.stocks[index].currentPrice)
        stock.currentPrice *= 0.95
        stockMarket.lastUpdated = new Date()
        for (let index = 0; index < stockMarket.stocks.length; index++) {
           if (stock.category == stockMarket.stocks[index].category){
            stockMarket.stocks[index].category *= 0.99
           }
        }
        

      }
    }
    if (sum == 0) {
      console.log("The ID you provided was not found.");
    }
  }
  if (operation != "buy" || operation != "sell") {
    console.log(
      "You have requested an illegal action that cannot be performed."
    );
  }
}
