import CertificateJson from "../build/contracts/Certificate.json"; 
// import * as contract from "@truffle/contract";
const contract = require('@truffle/contract');
const Certificate = contract(CertificateJson)

// export const start = () => {
//     Certificate
// }