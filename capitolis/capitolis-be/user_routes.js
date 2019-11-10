var _ = require('lodash');
const fetch = require("node-fetch");
let positionJson = require('./dataJson/position.json');
let finUnitsJson = require('./dataJson/finUnit.json')

module.exports = function (app) {
    let url = 'https://api.exchangeratesapi.io/latest?base=USD';
  //& currencies = EUR,GBP,CAD,PLN
    let currencies;
    let positions;
    let finUnits;
    positions = positionJson.positions;
    finUnits = finUnitsJson.finUnits;
    let getCurrencies = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            return currencies = json;
        } catch (error) {
            console.log(error);
        }
    };
    getCurrencies(url).then( currencies =>
        aggregationData2(positions, finUnits, currencies)
        );

    app.put('/user', function (req, res) 
    {
        var newUser = new User(req.body);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        newUser.save(function (err) {
            if (err) {
                res.json({ info: 'error during user creation' })
            }
            res.json({ info: 'user created' })
        });
    })
    app.get('/user', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        User.find(function (err, users) {
            if (err) {
                res.json({ info: 'error during users get' })
            }
            res.json({ info: 'users found', data: users });
        });
    })

    app.get('/currencies', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.send(currencies);
    })

    app.get('/positions', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.send(positions);
    })
    app.get('/finUnits', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.send(finUnits);
    })

    app.get('/findUnitsByPositions', function (req, res) {
        let result;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        getCurrencies(url).then( currencies =>{
            result = aggregationData1(positions, finUnits, currencies);
            res.send(result);        
        });
    });

    function aggregationData1(positions, finUnits, currencies){
        let result = [];
        for (let i = 0; i < positions.length ; i ++){
            let item = {};
            let or =  positions[i].fuOriginId;
            let origin = _.find(finUnits, (elem) => elem.id === or);
            item.financial_unit = origin ? origin.name : null;
            item.notional = positions[i].data.currency.notionalValue;
            item.currency = positions[i].data.currency.ccy;
            item.rate = currencies.rates[item.currency];
            item.calc = item.notional * item.rate;
            
            result.push(item); 
        }
        return result;
    }
    function aggregationData2(positions, finUnits, currencies){
        let result = [];
        for (let i = 0; i < finUnits.length ; i ++){
            let item = {};
            let id =  finUnits[i].id;
            let position = _.find(positions, (elem) => elem.fuOriginId === id);
            item.finUnit =  finUnits[i].name;
            item.notional = position ? position.data.currency.notionalValue: null;
            item.currency = position ? position.data.currency.ccy : null;
            item.rate = currencies.rates[item.currency];
            item.calc = item.notional * item.rate;
            result.push(item); 
        }
        return result;
    }
    




}