import SummaryApi from '../common/index'

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch('https://mern-ecommerce-7npwe4t1m-yogeshs-projects-60f26ef9.vercel.appapi/category-product', {
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