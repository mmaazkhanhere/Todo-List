import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
var itemsList = [];
var timeForItems = [];
var timeofRemoval = [];
var timeRemoved = [];
function turnOff() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2500);
    });
}
/////////////////////////////////////////////////////////////////////////////////////
async function display() {
    let title = chalkAnimation.rainbow('Todo List');
    await turnOff();
    let anotherTitle = chalkAnimation.neon('Lets get started');
    await turnOff();
    anotherTitle.stop();
}
;
/////////////////////////////////////////////////////////////////////////////////////
async function todoThings() {
    console.log('Items to do: ');
    for (let i = 0; i < itemsList.length; i++) {
        console.log(`${i + 1}: ${itemsList[i]}\nTime of Creation: ${timeForItems[i].toLocaleString()},
Time to complete: ${timeofRemoval[i].toLocaleString()}`);
    }
    ;
}
/////////////////////////////////////////////////////////////////////////////////////
async function addItems() {
    do {
        let Items = await inquirer.prompt([{
                name: 'items',
                type: 'input',
                message: 'Enter task you want to perform: ',
            }]);
        itemsList.push(Items.items);
        await addTime();
        var doAgain = await inquirer.prompt([{
                name: 'doAgain',
                type: 'list',
                message: 'Do you want to add more tasks?',
                choices: ['Yes', 'No']
            }]);
    } while (doAgain.doAgain == 'Yes');
    console.log('');
    for (let i = 0; i < itemsList.length; i++) {
        console.log(`${i + 1}: ${itemsList[i]}\nTime added: ${timeForItems[i].toLocaleString()}
Time to complete: ${timeofRemoval[i].toLocaleString()}`);
    }
    ;
}
///////////////////////////////////////////////////////////////////////////////////
async function addTime() {
    let date = new Date();
    timeForItems.push(date);
    console.log('\nSet the time to do it:');
    let addingTime = await inquirer.prompt([{
            name: 'Day',
            type: 'input',
            message: 'Enter day of month (1-30/31)'
        },
        {
            name: 'Month',
            type: 'input',
            message: 'Enter month number (1-12)'
        },
        {
            name: 'Year',
            type: 'input',
            message: 'Enter year'
        },
        {
            name: 'Hour',
            type: 'input',
            message: 'Enter hour (0-24)'
        },
        {
            name: 'Minute',
            type: 'input',
            message: 'Enter minutes (0-59)'
        }]);
    let dateofRemoval = new Date(addingTime.Year, addingTime.Month - 1, addingTime.Day, addingTime.Hour, addingTime.Minute);
    timeofRemoval.push(dateofRemoval);
}
///////////////////////////////////////////////////////////////////////////////////
async function removeItems() {
    let performOperation = await inquirer.prompt([{
            name: 'performOperation',
            type: 'list',
            message: 'Do you want to remove any tasks?',
            choices: ['Yes', 'No']
        }]);
    if (performOperation.performOperation == 'Yes') {
        do {
            let itemRemove = await inquirer.prompt([{
                    name: 'itemRemove',
                    type: 'list',
                    message: 'Choose the task to remove',
                    choices: itemsList
                }]);
            let indexofItem = itemsList.indexOf(itemRemove);
            itemsList.splice(indexofItem, 1);
            let dateRemoved = new Date();
            console.log(`Time removed: `, dateRemoved.toLocaleString());
            var DoAgain = await inquirer.prompt([{
                    name: 'DoAgain',
                    type: 'list',
                    message: 'Do you want to remove more tasks?',
                    choices: ['Yes', 'No']
                }]);
        } while (DoAgain.DoAgain == 'Yes');
        console.log('');
        for (let i = 0; i < itemsList.length; i++) {
            console.log(`Things still to do: ${itemsList[i]}`);
        }
    }
    else {
        console.log('');
        for (let i = 0; i < itemsList.length; i++) {
            console.log(`Things you have to do: ${itemsList[i]}`);
        }
        console.log('Best of Luck');
    }
}
///////////////////////////////////////////////////////////////////////////////////
async function Menu() {
    do {
        let mainMenu = await inquirer.prompt([{
                name: 'mainMenu',
                type: 'list',
                message: 'Which action do you want to perform?',
                choices: ['Todo Tasks', 'Add Tasks', 'Remove Tasks']
            }]);
        switch (mainMenu.mainMenu) {
            case 'Todo Tasks':
                await todoThings();
                break;
            case 'Add Tasks':
                await addItems();
                break;
            case 'Remove Tasks':
                await removeItems();
                break;
        }
        var DoingAgain = await inquirer.prompt([{
                name: 'DoingAgain',
                type: 'list',
                message: 'Do you want to perform any other operation? ',
                choices: ['Yes', 'No']
            }]);
    } while (DoingAgain.DoingAgain == 'Yes');
}
///////////////////////////////////////////////////////////////////////////////////
async function toDoList() {
    await display();
    Menu();
}
toDoList();
///////////////////////////////////////////////////////////////////////////////////
