const ProductRepository = require("../repositories/ProductRepository");
const isValidUUID = require("../utils/isValidUUID");

/* eslint-disable class-methods-use-this */
class ProductController {
  async index(request, response) {
    const products = await ProductRepository.findAll();
    response.json(products);
  }

  async store(request, response) {
    const { name, ean, platform, cost, salePrice, dateValue } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório!!" });
    }
    if (!ean) {
      return response.status(400).json({ error: "Ean é obrigatório!!" });
    }
    if (!platform) {
      return response.status(400).json({ error: "Plataforma é obrigatória!!" });
    }
    if (!cost) {
      return response.status(400).json({ error: "Cost é obrigatório!!" });
    }
    if (!salePrice) {
      return response.status(400).json({ error: "SalePrice é obrigatório!!" });
    }
    if (!dateValue) {
      return response.status(400).json({ error: "DateValue é obrigatório!!" });
    }

    const product = await ProductRepository.create({
      name,
      ean,
      platform,
      cost,
      salePrice,
      dateValue,
    });

    response.json(product);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Product ID inválido!" });
    }

    const product = await ProductRepository.findById(id);

    if (!product) {
      response.status(404).json({ error: "Produto não encontrado." });
    }

    response.json(product);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, ean, platform, cost, salePrice, dateValue } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Product ID inválido!" });
    }

    const findProductById = await ProductRepository.findById(id);

    if (!findProductById) {
      response.status(404).json({ error: "Produto não encontrado." });
    }
    if (!name) {
      response.status(404).json({ error: "Nome é obrigatório." });
    }
    if (!ean) {
      response.status(404).json({ error: "Ean é obrigatório." });
    }
    if (!platform) {
      response.status(404).json({ error: "Plataforma é obrigatória." });
    }
    if (!cost) {
      response.status(404).json({ error: "Cost é obrigatório." });
    }
    if (!salePrice) {
      response.status(404).json({ error: "SalePrice é obrigatório." });
    }
    if (!dateValue) {
      response.status(404).json({ error: "DateValue é obrigatório." });
    }

    const product = await ProductRepository.update(id, {
      name,
      ean,
      platform,
      cost,
      salePrice,
      dateValue,
    });

    response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Product ID inválido!" });
    }

    const findProductById = await ProductRepository.findById(id);

    if (!findProductById) {
      return response.status(404).json({ error: "Produto não existe." });
    }

    await ProductRepository.delete(id);
    response.status(200).json({ sucess: "product deleted" });
  }
}

module.exports = new ProductController();
