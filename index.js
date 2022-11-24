const args = process.argv.slice(2)
var fs = require('fs')
//import xlsx from 'node-xlsx';
var xlsx = require('node-xlsx').default;
var convert = require('xml-js');

if (!args[0]){
 console.log("Se apeleaza impreuna cu numele fisierului xlsx sursa, fara extensie")
process.exit(1)
}
    

let filename = args[0]


const ws = xlsx.parse(fs.readFileSync(`${__dirname}/${filename}.xlsx`));

const facturi = ws[0].data
const header = facturi.shift()
const h  = header.reduce((acc,l,index)=>{
    acc[l] = index
    return acc
},{})

//console.log(h)


let last_CF = null
const z = facturi.reduce((acc,f)=>{
    const CF = f[h.FacturaNumar]
    const CL = f[h.LinieNrCrt]
    let linie_noua = {    
        "LinieNrCrt": f[h.LinieNrCrt],
        "Gestiune": f[h.Gestiune],
        "Activitate": f[h.Activitate],
        "Descriere": f[h.Descriere],
        "CodArticolFurnizor": f[h.CodArticolFurnizor],
        "CodArticolClient": f[h.CodArticolClient],
        "CodBare": f[h.CodBare],
        "InformatiiSuplimentare": f[h.InformatiiSuplimentare],
        "UM": f[h.UM],
        "Cantitate": f[h.Cantitate],
        "Pret": f[h.Pret],
        "Valoare": f[h.Valoare],
        "ProcTVA": f[h.ProcTVA],
        "TVA": f[h.TVA],
        "Cont": f[h.Cont],
        "TipDeducere": f[h.TipDeducere],
        "PretVanzare": f[h.PretVanzare]
    }
    if(CF === last_CF)
        {
            acc.Facturi.Factura[acc.Facturi.Factura.length-1].Detalii.Continut.Linie.push(linie_noua)
        } else {
            last_CF = CF
            let fact_noua = {
                "Antet": {
                    "FurnizorNume": f[h.FurnizorNume],
                    "FurnizorCIF": f[h.FurnizorCIF],
                    "FurnizorNrRegCom": f[h.FurnizorNrRegCom],
                    "FurnizorCapital": f[h.FurnizorCapital],
                    "FurnizorTara": f[h.FurnizorTara],
                    "FurnizorLocalitate": f[h.FurnizorLocalitate],
                    "FurnizorJudet": f[h.FurnizorJudet],
                    "FurnizorAdresa": f[h.FurnizorAdresa],
                    "FurnizorTelefon": f[h.FurnizorTelefon],
                    "FurnizorMail": f[h.FurnizorMail],
                    "FurnizorBanca": f[h.FurnizorBanca],
                    "FurnizorIBAN": f[h.FurnizorIBAN],
                    "FurnizorGrupa": f[h.FurnizorGrupa],
                    "FurnizorInformatiiSuplimentare": f[h.FurnizorInformatiiSuplimentare],
                    "GUID_cod_client": f[h.GUID_cod_client],
                    "ClientNume": f[h.ClientNume],
                    "ClientInformatiiSuplimentare": f[h.ClientInformatiiSuplimentare],
                    "ClientCIF": f[h.ClientCIF],
                    "ClientNrRegCom": f[h.ClientNrRegCom],
                    "ClientJudet": f[h.ClientJudet],
                    "ClientLocalitate": f[h.ClientLocalitate],
                    "ClientTara": f[h.ClientTara],
                    "ClientAdresa": f[h.ClientAdresa],
                    "ClientTelefon": f[h.ClientTelefon],
                    "ClientEmail": f[h.ClientEmail],
                    "ClientBanca": f[h.ClientBanca],
                    "ClientIBAN": f[h.ClientIBAN],
                    "ClientGrupa": f[h.ClientGrupa],
                    "FacturaNumar": f[h.FacturaNumar],
                    "FacturaData": f[h.FacturaData],
                    "FacturaScadenta": f[h.FacturaScadenta],
                    "FacturaTaxareInversa": f[h.FacturaTaxareInversa],
                    "FacturaTVAIncasare": f[h.FacturaTVAIncasare],
                    "FacturaEFactura": f[h.FacturaEFactura],
                    "FacturaTip": f[h.FacturaTip],
                    "FacturaInformatiiSuplimentare": f[h.FacturaInformatiiSuplimentare],
                    "FacturaMoneda": f[h.FacturaMoneda],
                    "FacturaCotaTVA": f[h.FacturaCotaTVA],
                    "FacturaGreutate": f[h.FacturaGreutate],
                    "FacturaAccize": f[h.FacturaAccize],
                    "Cod": f[h.Cod]
                },
                "Detalii": {
                    "Continut":{
                        "Linie":  [
                            {
                                ...linie_noua
                            }
                        ]
                    },
                    "txtObservatii1": f[h.txtObservatii1]
                },
                "Sumar": {
                    "TotalValoare": f[h.TotalValoare],
                    "TotalTVA": f[h.TotalTVA],
                    "Total": f[h.Total],
                    "LinkPlata": f[h.LinkPlata]
                },
                "Observatii": {
                    "txtObservatii": f[h.txtObservatii],
                    "SoldClient": f[h.SoldClient],
                    "ModalitatePlata": f[h.ModalitatePlata]
                },
                "FacturaID": f[h.FacturaID],
                "GUID_factura": f[h.GUID_factura],
            }
            acc.Facturi.Factura.push(fact_noua)
        }
      return acc 
},{
	"_declaration": {
		"_attributes": {
			"version": "1.0",
			"encoding": "UTF-8"
		}
	},
	"Facturi": {
        "Factura":[]
    }
})

console.log(JSON.stringify(z))

var options = {compact: true, ignoreComment: true, spaces: 4};
var result = convert.json2xml(z, options);

fs.writeFileSync(`${__dirname}/${filename}.xml`,result) 