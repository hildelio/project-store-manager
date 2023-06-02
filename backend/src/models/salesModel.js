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
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(`SELECT 
    s.date,
    sp.product_id AS productId,
    sp.quantity
FROM
    sales_products AS sp
        INNER JOIN
    products AS p ON sp.product_id = p.id
        INNER JOIN
    sales AS s ON sp.sale_id = s.id
    WHERE
    sp.sale_id = ?
ORDER BY sale_id , product_id`, [id]);
  return result;
};

const registerSalesId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (DATE(NOW()))',
  );
  return insertId;
};

const registerSales = async (insertId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO sales_products
    (sale_id, product_id, quantity) VALUE (?, ?, ?)`,
     [insertId, productId, quantity],
     );
  return { productId, quantity };
};

module.exports = { getAll, getById, registerSalesId, registerSales };