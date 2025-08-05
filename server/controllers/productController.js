import createCjApiInstance from "../utils/cjApi.js";

export const getMyProducts = async (req, res) => {
  try {
    const cjApi = await createCjApiInstance();
    const pricePercentage = 1.4;

    const response = await cjApi.get('/product/myProduct/query', {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    });

    const products = response.data?.data?.content || [];

    const updatedProducts = products.map((p) => ({
      id: p.productId,
      name: p.nameEn,
      image: p.bigImage,
      price: (parseFloat(p.totalPrice) * pricePercentage).toFixed(2),
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error("getMyProducts klaida:", error.response?.data || error.message);
    res.status(500).json({ message: "nepavyko gauti produktu" });
  }
};


export const getProductDetails = async (req, res) => {
  try {
    const { pid } = req.params;
    const cjApi = await createCjApiInstance();
     const pricePercentage = 1.4;

    const response = await cjApi.get("/product/query", {
      params: { pid },
    });

    const data = response.data.data;
    const variants = data.variants || [];

    const sizeOptions = [
      "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL",
      "2XL", "3XL", "4XL", "5XL", "6XL", "One Size", "Free Size"
    ];

    const skus = variants.map((v) => {
      let color = "Nenurodyta";
      let size = "Nenurodyta";

      const key = v.variantKey?.trim() || "";
      const parts = key.split("-").map(p => p.trim());

      for (let part of parts) {
        if (sizeOptions.includes(part)) size = part;
        else color = part;
      }

      return {
        skuId: v.variantSku,
        color,
        size,
        image: v.variantImage || data.productImage || "",
        price: (parseFloat(v.variantSellPrice) * pricePercentage).toFixed(2),
      };
    });

    const product = {
      id: data.pid,
      name: data.productNameEn,
      description: data.description,
      image: data.productImage || "",
      price: (parseFloat(data.sellPrice) * pricePercentage).toFixed(2),
      skus: skus.filter((s) => s.skuId && s.price),
    };

    res.json(product);
  } catch (error) {
    console.error("getProductDetails klaida:", error.response?.data || error.message);
    res.status(500).json({ message: "nepavyko gauti produkto detaliu" });
  }
};
