export function renderProductTableFilter(searchTerm, setSearchTerm, 
                                        selectedCategory, setSelectedCategory,
                                        categoriesList) {
    return (
        <div className="container mt-4">
                <div className="form-group row">
                    <label htmlFor="search" className="col-sm-2 col-form-label">Search:</label>
                    <div className="col-sm-6">
                        <input className="form-control mb-2" type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="category" className="col-sm-2 col-form-label">Select category:</label>
                    <div className="col-sm-6">
                        <select className="form-control mb-2" id="category" value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value === '' ? null : parseInt(e.target.value, 10))}>
                            <option value="">All Categories</option>
                            {categoriesList.map((category) => (
                                <option key={category.idcategory} value={category.idcategory}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
    )
}

export function renderProductsTable(productsList, searchTerm, selectedCategory, ActionButton) {
    return (
        <div className="productsTable">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList
                            .filter((product) =>
                                product.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .filter((product) =>
                                selectedCategory ? product.idcategory === selectedCategory : true
                            )
                            .map((product, index) => (
                                console.log(product),
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        {ActionButton(product)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
    )
}

export function renderAddToCartButton(productsCart, setProductCart) {
    return function render(product) {
        return (
            <button className="btn btn-primary" onClick={() => {
                const newProductsCart = [...productsCart, product];
                setProductCart(newProductsCart);
            }}>Add To Cart</button>
        )
    }
}

export function renderEditProductButton(setShowEditProductForm, setProductToEdit) {
    return function render(product) {
        return (
            <button className="btn btn-primary" onClick={() => {
                setProductToEdit(product);
                setShowEditProductForm(true);
            }}>Edit Product</button>
        )
    }
}