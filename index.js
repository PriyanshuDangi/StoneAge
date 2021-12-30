require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.pinata_api_key, process.env.pinata_secret_api_key);

const app = express();

const corsOption = {
    origin: ['https://localhost:3000, https://stoneage.originx.games'],
    optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterList: 5000 }));

// app.get('/', (req, res) => {
//     res.status(200).send('Priyanshu is The King');
// });

app.post('/updateModel', async (req, res) => {
    try {
        let { token_id, JSONBody } = req.body;
        console.log(req.body);
        if (!Number.isInteger(token_id) && !JSONBody && token_id >= 0) {
            throw new Error('Please provide all and valid details!');
        }

        const auth = await pinata.testAuthentication();
        const time = new Date();
        const options = {
            pinataMetadata: {
                name: token_id.toString() + '---' + time.toJSON(),
                keyvalues: {
                    token_id: 'v0' + token_id.toString(),
                },
            },
            pinataOptions: {
                cidVersion: 1,
            },
        };

        const result = await pinata.pinJSONToIPFS({ ...JSONBody, token_id: token_id }, options);
        console.log(result);
        if (!result.IpfsHash || !result.PinSize) {
            throw new Error('IpfsHash or PinSize not defined');
        }
        res.status(200).json({ status: true, msg: 'pinned successfully', hash: result.IpfsHash, result });
    } catch (err) {
        console.log(err);
        if (err.name === 'Error' && err.message) {
            res.status(400).json({ status: false, msg: err.message });
        } else {
            res.status(500).json({ status: false, msg: 'Cannot be updated' });
        }
    }
});

app.use(express.static('client/build'));
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('server running at ' + port);
});
