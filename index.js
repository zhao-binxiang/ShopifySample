const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAdress = "https://fb364c20.ngrok.io";

app.get('/',(req,res) => {
	res.send('Hello world!');
})

app.listen(3000,()=> {
	console.log('Example app listening on port 3000!')
})

app.get('/shopify',(req,res)=>{
	const shop = req.qeury.shop;
	if (shop) {
		const state = nonce();
		const redirectUri = forwardingAdress + '/shopify/callback';
		const installUrl = 'https://' + shop + 
		'/admin/oauth/authorize?client_id=' + apiKey +
		'&scope=' + scopes +
		'&state=' + state +
		'&redirect_uri=' + redirectUri;

		res.cookie('state',state);
		res.redirect(installUrl);  
	} else{
		return res.status(400).send('Missing shop parameter. Please add ?shop=yourdevelopment-shop.myshopify.com to your request')
	}
})