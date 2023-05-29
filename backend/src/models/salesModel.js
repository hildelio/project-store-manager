const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
  `SELECT 
    sp.sale_id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity
FROM
    sales_products AS sp
        INNER JOIN
    products AS p ON sp.product_id = p.id
        INNER JOIN
    sales AS s ON sp.sale_id = s.id
ORDER BY sale_id , product_id`,
  );
  console.log(result);
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return result;
};

module.exports = { getAll, getById };