
function LoadCategories() {
    fetch("http://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.unshift("all");
            for (var category of data) {
                var option = document.createElement("option");
                option.text = category.toUpperCase();
                option.value = category;

                document.getElementById("lstCategories").appendChild(option);

            }

        })
}

function LoadProducts(url) {
    document.querySelector("main").innerHTML = "";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var products of data) {
                var div = document.createElement("div");
                div.className = "card m-2 p-2";
                div.style.width = "200px";
                div.innerHTML = `
                <img src=${products.image} height="150" class="card-img-top">
                <div class="card-header" style="height:160px">
                    <p>${products.title}<p>

                </div>
                <div class="card-body">
                    <dl>
                        <dt>Price</dt>
                        <dd>${products.price}</dd>
                        <dt class="btn btn-warning">Rating</dt>
                        <dd>
                            <span class="bi bi-star-fill text-success"></span>
                            ${products.rating.rate} [${products.rating.count}]
                        </dd>

                    </dl>

                </div>
                <div class="card-footer">
                    <button onclick="AddClick(${products.id})" class="btn btn-primary"><span class="bi bi-cart4"></span>Add to cart</button>
                </div>

                `;
                document.querySelector("main").appendChild(div);
            }

        })
}


function bodyload() {
    LoadCategories();
    LoadProducts("http://fakestoreapi.com/products");
    GetCartItemsCount();
}

function CategoryChanged() {
    var categoryname = document.getElementById("lstCategories").value;
    if (categoryname == "all") {
        LoadProducts("http://fakestoreapi.com/products");
    } else {
        LoadProducts(`http://fakestoreapi.com/products/category/${categoryname}`);
    }

}
var cartItems = [];

function GetCartItemsCount() {
    document.getElementById("lblCount").innerHTML = cartItems.length;
}

function AddClick(id) {
    fetch(`http://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cartItems.push(data);
            alert(`${data.title} \nAdded to Cart`);
            GetCartItemsCount();
            LoadCartItems()

        });

}

function LoadCartItems() {
    document.querySelector("tbody").innerHTML = "";
    for (var items of cartItems) {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML = items.title;
        tdPrice.innerHTML = items.price;
        tdPreview.innerHTML = `
        <img  src=${items.image} width="50" height="50">
        
        `;
        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPreview);

        document.querySelector("tbody").appendChild(tr);
    }
}

