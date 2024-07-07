import SummaryApi from '../common/index'

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch('http://localhost:8080/api/category-product', {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })

    // console.log(SummaryApi.categoryWiseProduct.url);

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct