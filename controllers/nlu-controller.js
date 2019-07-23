const mammoth = require("mammoth");
const pdfjs = require("pdfjs-dist");
const NLURequest = require("../model/nlu-request");
require('dotenv').load();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

function organize(dados) {
    return new Promise((resolve, reject) => {
        const termo = dados.entities.filter(obj => obj.type == 'Termo_acordo');
        const numero = dados.entities.filter(obj => obj.type == 'Numero_processo');
        const reu = dados.entities.filter(obj => obj.type == 'Reu');
        const autor = dados.entities.filter(obj => obj.type == 'Autor');
        const tp = dados.entities.filter(obj => obj.type == 'Tipo_processo');
        const title = dados.entities.filter(obj => obj.type == 'Titulo');

        let finalArray = []

        const tamanho = [termo.length, numero.length, reu.length, autor.length, tp.length, title.length].sort((a, b) => { return b - a });

        for (let i = 0; i < tamanho[0]; i++) {
            finalArray.push({
                termo: (termo[i] != undefined ? termo[i].text : false),
                numero: (numero[i] != undefined ? numero[i].text : false),
                reu: (reu[i] != undefined ? reu[i].text : false),
                autor: (autor[i] != undefined ? autor[i].text : false),
                tipo_processo: (tp[i] != undefined ? tp[i].text : false),
                title: (title[i] != undefined ? title[i].text : false),
            })
        }

        // console.log(finalArray)
        resolve(finalArray);
    });
}

exports.NLU = (req, res) => {
    nlu = new NaturalLanguageUnderstandingV1({
        iam_apikey: process.env.IAM_APIKEY,
        version: '2019-07-12'
    });

    if (req.file) {
        if (req.file.mimetype == 'application/pdf') {
            pdfjs.getDocument({ data: req.file.buffer }).then(result => {
                let pages = []
                for (let i = 1; i <= result.numPages; i++) {
                    pages.push(new Promise((resolve, reject) => {
                        result.getPage(i).then(result2 => {
                            result2.getTextContent().then(result3 => {
                                let heigth = -1
                                let paragrafs = []
                                let paragraf = ''
                                result3.items.forEach(element => {
                                    if (element.transform[5] == heigth) {
                                        paragraf += element.str
                                    } else {
                                        paragrafs.push(paragraf)
                                        paragraf = element.str
                                        heigth = element.transform[5]
                                    }
                                });
                                resolve(paragrafs.join('\n'))
                            }).catch((err) => {
                                console.log(err);
                                reject(err)
                            });
                        }).catch((err) => {
                            console.log(err);
                            reject(err)
                        });
                    }))
                }
                Promise.all(pages).then(result4 => {
                    let text = result4.join('\n')
                    let request = new NLURequest(nlu, text, process.env.MODEL_ID)
                    request.execute().then(result5 => {
                        organize(result5).then(data => {
                            console.log('promisse resp', data)
                            res.send({ msg: data, msg2: { result5 } })
                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: true });
                    });
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({ error: true });
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ error: true });
            });
        } else if (req.file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            mammoth.extractRawText({ buffer: req.file.buffer })
                .then(function (result) {
                    var text = result.value; // The generated HTML
                    var messages = result.messages; // Any messages, such as warnings during conversion
                    if (messages.length > 0) {
                        console.log(messages)
                    }
                    let request = new NLURequest(nlu, text, process.env.MODEL_ID)
                    request.execute().then(result => res.send(result)).catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: true });
                    });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: true })
                });
        }
        else {
            res.status(500).json({ error: true })
        }
    } else {
        let text = req.body.input;
        let request = new NLURequest(nlu, text)
        request.execute().then(result => res.send(result)).catch((err) => {
            console.log(err);
            res.status(500).json({ error: true })
        });
    }
}
