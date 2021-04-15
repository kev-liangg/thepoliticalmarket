import {
    containsOp, notContainsOp, eqOp, neqOp, ltOp, gtOp, lteOp, gteOp 
} from '../filtering-logic/Operators.js'

export const fields = [{
    caption: 'Recipient',
    name: 'contract_recipient',
    operators: [containsOp, notContainsOp]
}, {
    caption: 'Contract Value',
    name: 'contract_currentval',
    operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]
}, {
    caption: 'Award Date',
    name: 'contract_date',
    operators: [containsOp, notContainsOp]
}, {
    caption: 'NAICS',
    name: 'contract_naics',
    operators: [eqOp, neqOp]
}, {
    caption: 'State',
    name: 'contract_sop',
    operators: [containsOp, notContainsOp]
}, {
    caption: 'Congressional District',
    name: 'contract_recipient_district',
    operators: [eqOp, neqOp]
}]

export const groups = [{
    caption: 'And',
    name: 'and',
}, {
    caption: 'Or',
    name: 'or',
}];