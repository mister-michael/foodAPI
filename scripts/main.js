const foodList = document.querySelector(".foodList");

const makeHTML = (food) => {
    // foodObject = food[i];
    // for (let i=0 ; i < foodObject.length ; i++)
    return `
    <article class="foodBox">
    <section class="textBox">
    <div class="bigText">${food.name}</div>
    <div class="smallText">${food.ethnicity}</div>
    <div class="smallText">${food.category}</div>
    </section>
    </article>    `
}

// const addHTMLToDom = (foodAsHTML) => {
            
//     // for (let i = 0 ; i < food.length; i++) {
//     //     foodToMake = food[i];
//         foodList.innerHTML += foodAsHTML
//     }


fetch("http://localhost:8088/food")
    .then(responseFromApi => responseFromApi.json())
    .then(parsedDataFromApi => {
        console.table(parsedDataFromApi)
        parsedDataFromApi.forEach(food => {
            foodList.innerHTML += makeHTML(food)
          
        });
    })