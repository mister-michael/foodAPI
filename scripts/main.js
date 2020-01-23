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
    <div class="smallText">${food.ingredients}</div>
    <div class="smallText">Origin: ${food.country}</div>
    <div class="smallText">${food.calories}kcal</div>
    <div class="smallText">${food.fat}g</div>
    <div class="smallText">${food.sugar}g</div>

    </section>
    </article>    `
}

const foodFactory = (foodArray) => {
    foodArray.forEach(food => {
        innerHTML += makeHTML(food);
    })
}

fetch("http://localhost:8088/food")
    .then(resp => resp.json())
    .then(foodData => {
        console.table(foodData);
        foodData.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(resp => resp.json())
                .then(productInfo => {
                    console.log(productInfo)

                    if (productInfo.product.ingredients_text_with_allergens_en) {
                        food.ingredients = productInfo.product.ingredients_text_with_allergens_en
                    } else {
                        food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "no country of origin listed"
                    }

                    if (productInfo.product.nutriments.energy_value) {
                        food.calories = productInfo.product.nutriments.energy_value
                    } else {
                        food.calories = "no calorie content listed"
                    }

                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    } else {
                        food.fat = "no fat content listed"
                    }

                    if (productInfo.product.nutriments.sugars_value) {
                        food.sugar = productInfo.product.nutriments.sugars_value
                    } else {
                        food.sugar = "no sugar content listed"
                    }
                    foodList.innerHTML += makeHTML(food)
                })
        })
    });