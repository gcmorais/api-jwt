const db = require("../../database");

class ProductRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT *, TO_CHAR(dateValue, 'DD-MM-YYYY') AS dateValue
      FROM products
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT *, TO_CHAR(dateValue, 'DD-MM-YYYY') AS dateValue
      FROM products
      WHERE id = $1
    `,
      [id]
    );
    return row;
  }

  async create({ name, ean, platform, cost, salePrice, dateValue }) {
    const [row] = await db.query(
      `
      INSERT INTO products(name, ean, platform, cost, salePrice, dateValue)
      VALUES($1, $2, $3, $4, $5, to_date($6, 'DD-MM-YYYY'))
      RETURNING *
    `,
      [name, ean, platform, cost, salePrice, dateValue]
    );

    return row;
  }

  async update(id, { name, ean, platform, cost, salePrice, dateValue }) {
    const [row] = await db.query(
      `
      UPDATE products
      SET name = $1, ean = $2, platform = $3, cost = $4, salePrice = $5, dateValue = to_date($6, 'DD-MM-YYYY')
      WHERE id = $7
      RETURNING *
    `,
      [name, ean, platform, cost, salePrice, dateValue, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM products
      WHERE id = $1
    `,
      [id]
    );
    return deleteOp;
  }
}

module.exports = new ProductRepository();
