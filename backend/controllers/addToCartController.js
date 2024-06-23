const addToCartModel = require('../models/cartProduct');

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // console.log("Received productId:", productId);
        // console.log("Current user ID:", currentUser);

        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        // console.log("isProductAvailable:", isProductAvailable);

        if (isProductAvailable) {
            return res.status(200).json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        // console.log("saveProduct:", saveProduct);

        return res.status(201).json({
            data: saveProduct,
            message: "Product Added in Cart",
            success: true,
            error: false
        });

    } catch (err) {
        // console.error("Error in addToCartController:", err);
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
