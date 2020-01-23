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

const foodFactory = ()

fetch("http://localhost:8088/food")
    .then(responseFromApi => responseFromApi.json())
    .then(parsedDataFromApi => {
        console.table(parsedDataFromApi)
        parsedDataFromApi.forEach(food => {

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.table(productInfo)
                    productInfo.forEach(barcode => {
                        if (barcode.product.ingredients_text_with_allergens_en) {
                            food.ingredients = barcode.product.ingredients_text_with_allergens_en
                        } else {
                            food.ingredients = "no ingredients listed"
                        }
                    }
                    )


                })
            foodList.innerHTML += makeHTML(food)
        });


    })