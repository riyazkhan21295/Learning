const getAllProductsStatic = async (request, response) => { 
    response.status(200).json({
        msg: 'products testing route'
    });
};

const getAllProducts = async (request, response) => { 
    response.status(200).json({
        msg: 'products route'
    });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};