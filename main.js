import input from "analiza-sync";
import { OperateOnStock,filterStocksByPrice,searchStock } from "./Array_update.js";

console.log("------- Welcome to Stock Trading App---------");
console.log("1. To search for a stock by name or ID press 1,\n2. To display all stocks above or below a given price press 2,\n3. To buy or sell a stock press 3,\n4. To exit press 4");
let choice = input("Please enter which action you would like to perform:   ")
const listi = ["1","2","3","4"]
while (!listi.includes(choice)){
    choice = input("Please enter which action you would like to perform:   ")
}
while (choice != "4"){
    if (choice == "1"){
        let identifier = input("Please enter the ID number or company name you wish to search for:   ")
        console.log(searchStock(identifier));
         
    }
    if (choice == "2"){
        let givenPrice = input("Please select a given price   ")
        while (givenPrice ){}
        let above = input("For prices above, press True. For prices below, press False:   ")
        filterStocksByPrice(+givenPrice, above)
    }
    if (choice == "3"){
        let operation = input("If you want to buy Anna, click buy and if you want to sell Anna, click sell: ")
        let identifier = input("Please enter the ID number or company name you wish to search for: ")
        OperateOnStock(operation, identifier)
    }
    console.log("To search for a stock by name or ID press 1,\nTo display all stocks above or below a given price press 2,\nTo buy or sell a stock press 3,\nTo exit press 4");
    choice = input("Please enter which action you would like to perform:   ")

}




