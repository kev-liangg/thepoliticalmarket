import {
    containsOp, notContainsOp, eqOp, neqOp, ltOp, gtOp, lteOp, gteOp 
} from '../filtering-logic/Operators.js'

export const fieldToName : { [key: string]: string }= {
    "Recipient": "contract_recipient",
    "Contract Value": "contract_currentval",
    "Award Date": "contract_date",
    "NAICS": "contract_naics",
    "State": "contract_sop",
    "Congressional District": "contract_recipient_district"
}

export const fields = [{
    name: 'Recipient',
    caption: 'Recipient',
    operators: [containsOp, notContainsOp]
}, {
    name: 'Contract Value',
    caption: 'Contract Value',
    operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]
}, {
    name: 'Award Date',
    caption: 'Award Date',
    operators: [containsOp, notContainsOp]
}, {
    name: 'NAICS',
    caption: 'NAICS',
    operators: [eqOp, neqOp]
}, {
    name: 'State',
    caption: 'State',
    operators: [containsOp, notContainsOp]
}, {
    name: 'Congressional District',
    caption: 'Congressional District',
    operators: [eqOp, neqOp]
}]

export const groups = [{
    caption: 'And',
    name: 'and',
}, {
    caption: 'Or',
    name: 'or',
}];