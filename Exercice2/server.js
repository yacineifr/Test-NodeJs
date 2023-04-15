const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
const port = 8080;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error',console.error.bind(console, 'MongoDB connection errora'));

// Schéma pour les produits
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

// Modèle pour les produits
const Product = mongoose.model('Product', productSchema);


app.use(bodyParser.json());


// Récupérer tous les produits
app.get('/products',(req, res) => {
  Product.find((err,products)=>{
    res.json(products)
  })

});

// Récupérer un produit spécifique
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id,(err,product)=> {
    res.json(product);
  })
})

// Ajouter un nouveau produit
app.post("/products", (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  })
  product.save((err) => {
    res.json(product);
  })
})

// Mettre à jour un produit spécifique
app.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Supprimer un produit spécifique
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  res.json(product);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
