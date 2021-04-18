import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import Highlighter from 'react-highlight-words'

// highlight function
export function hl (words, text) {
    return ( <>
        &nbsp;
        <Highlighter 
            searchWords={words.split(" ")} 
            textToHighlight={text}
            highlightStyle={{'backgroundColor':'yellow'}}>
        </Highlighter> 
    </> ) 
}