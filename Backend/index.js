

const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path')
const cors = require("cors");



app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://harshilpatel29072003:14OoUFt6aX4Fa3RV@cluster1.sn0qg1d.mongodb.net/E-commerce")

//  const instance = new Razorpay({
//     key_id: "rzp_test_5AI1hcWWmUdOL4",
//     key_secret:process.env.RAZOR_PAY_API_SECRET_KEY ,
// });

// const stripe = require("stripe")(process.env.SECRET_KEY)


app.get("/", (req, res)=> {
       res.send("Express App is Running")
})

const storage = multer.diskStorage({
    destination: './Upload/images',
    filename: (req, file, cb)=> {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})


const upload = multer({storage: storage})

app.use('/images', express.static('Upload/images'))

app.post("/Upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema Creation

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },
    
})


// Adding Product

app.post('/addproduct', async(req, res)=> {

   

    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id=1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})


//for Deleting Product

app.post('/removeproduct', async(req, res)=> {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: 1,
        name: req.body.name
    })
})


// Retrieving All Products to Frontend

app.get("/allproducts", async (req, res)=> {
    let products = await Product.find({})
    console.log("All Products Fetched");
    res.send(products)
})



// Schema for Users

const Users = mongoose.model('user',{
    name:{
        type: String,
    },
    email: {
        type: String,
        unique: true,

    },
    password:{
        type: String
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


app.post('/signup', async(req, res)=> {
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "Existing User Found"})
    }
    let cart={}
    for (let index = 0; index < 300; index++) {
        cart[index]=0;
    }

    const user = new Users({
        name: req.body.username,
        email:  req.body.email,
        password:  req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token})
})


// Creating endpoint for user login

app.post('/login', async(req, res)=> {
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const password = req.body.password === user.password;
        if(password){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.status(200).json({success: true, token});
        }
        else{
            res.status(400).json({success: false, errors: "Incorrect Credentials !!! Please try again with different credentials. "})
        }
    }
    else{
        res.status(400).json({success: false, error: "Incorrect Emain !! Please try again with different Email." })
    }
})



//creating endpoint for new collection data

app.get('/newCollection', async(req, res)=> {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched !!");
    res.send(newCollection)

})

app.get('/relatedCollection', async(req, res)=> {
  
    let products = await Product.find({});
    // console.log(products);
    let relatedCollection = products.slice(1).slice(-25);
    console.log("Related Collection Fetched !!");
    // console.log(newCollection);
    res.send(relatedCollection)

})


app.get('/popularinwomen', async(req, res) =>{
    let products = await Product.find({category: "Women"});
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched!!");
    res.send(popular_in_women);
} )

const fetchUser = async(req, res, next)=> {
         const token = req.header('auth-token');
         console.log(token);
         if (!token) {
            res.status(401).send({errors: "Please authenticate using valid token"})
         }
         else{
            try{
               const data = jwt.verify(token, 'secret_ecom');
               req.user = data.user;
               next();
            }catch(error){
                res.status(401).send({errors: "Please authenticate using a valid token"})
            }
         }
}



app.post('/addtocart',fetchUser, async(req, res)=> {
    const token = req.header('auth-token');
    console.log(token);
    
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId]++ ;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added")
     
})


app.post('/removefromcart', fetchUser, async(req, res)=> {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId]> 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed")
})


app.post('/getcart', fetchUser, async(req,res)=> {
    console.log('GetCart');
    let userData = await Users.findOne({_id: req.user.id});
    // console.log(userData);
    res.send(userData.cartData);
})


// Payment Gateway


app.listen(port, (error)=> {
       if(!error){
        console.log("Server Running on Port "+ port);
       }
       else{
        console.log("Error: "+ error);
       }
})
