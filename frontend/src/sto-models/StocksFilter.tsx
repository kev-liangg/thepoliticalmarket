import {
    containsOp, notContainsOp, eqOp, neqOp, ltOp, gtOp, lteOp, gteOp 
} from '../filtering-logic/Operators.js'

export const fields = [
    { name: 'Symbol', caption: 'Symbol',
      operators: [containsOp, notContainsOp]},
    { name: 'Full_Name', caption: 'Full Name',
      operators: [containsOp, notContainsOp]},
    { name: 'Last_Sale', caption: 'Last Sale',
      operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]},
    { name: 'Net_Change', caption: 'Net Change',
      operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]},
    { name: 'Percentage_Change', caption: '% Change',
      operators: [containsOp, notContainsOp]},
    { name: 'Market_Cap', caption: 'Market Capacity (k)',
      operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]},
    { name: 'Volume', caption: 'Volume', 
      operators: [eqOp, neqOp, ltOp, gtOp, lteOp, gteOp]},
    { name: 'IPO_Year', caption: 'IPO Year',
      operators: [containsOp, notContainsOp]},
    { name: 'Sector', caption: 'Sector',
      operators: [containsOp, notContainsOp]},
    { name: 'Industry', caption: 'Industry',
      operators: [containsOp, notContainsOp]},
    { name: 'State', caption: 'State',
      operators: [containsOp, notContainsOp]},
    { name: 'Country', caption: 'Country',
      operators: [containsOp, notContainsOp]},
];

export const groups = [{
    caption: 'And',
    name: 'and',
}, {
    caption: 'Or',
    name: 'or',
}];