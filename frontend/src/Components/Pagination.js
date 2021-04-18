import { Pagination, Box } from "@material-ui/core";

export function Pager ({numPages, page, setPage}) {
    return (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Pagination 
          count = {numPages}
          page = {page}
          onChange = {(event, page) => setPage(page)}
          showFirstButton
          showLastButton
          variant = "outlined"
          color="primary"
          size="large"
        />
    </Box>
    )
}