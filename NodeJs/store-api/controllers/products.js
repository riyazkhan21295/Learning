const Product = require('../models/product');

const applySort = (query, sort) => {
    let sortBy = 'createdAt';
    if (sort) {
        sortBy = sort.split(',').join(' ');
    }

    return query.sort(sortBy);
};

const applyFields = (query, fields) => {
    if (!fields) {
        return query;
    }

    const fieldsList = fields.split(',').join(' ');

    return query.select(fieldsList);
}

const applyPagination = (query, page, limit) => {
    const newPage = Number(page) || 1;
    const newLimit = Number(limit) || 10;

    const skip = (newPage - 1) * newLimit;

    return query.skip(skip).limit(newLimit);
};

const getAllProductsStatic = async (request, response) => {
    const products = await Product.find({ price: { $gt: 30 } })
        .sort('name')
        .select('name price');

    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (request, response) => {
    const { name, featured, company, sort, fields, numericFilters } = request.query;

    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true';
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };

        const regEx = /\b(>|>=|=|<=|<)\b/g;

        const filters = numericFilters.replace(regEx, match => {
            return `-${operatorMap[match]}-`;
        });

        const options = ['price', 'rating'];
        filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');

            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                };
            }
        });
    }

    let query = Product.find(queryObject);

    query = applySort(query, sort);
    query = applyFields(query, fields);
    query = applyPagination(query, request.query.page, request.query.limit);

    const products = await query;

    response.status(200).json({
        products,
        nbHits: products.length
    });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts,
};