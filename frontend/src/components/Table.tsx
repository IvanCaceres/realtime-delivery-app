import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    noResults: {
        display: 'flex',
        justifyContent: 'center'
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders({
    count,
    title = '',
    columns = [],
    data = [],
    apiResultSet,
    rowsPerPage,
    onChangeRowsPerPage,
    onChangePage,
    page = 0
}: {
    count?: number;
    title?: string;
    columns: any[];
    data: any[];
    apiResultSet?: any;
    onChangeRowsPerPage?: any;
    rowsPerPage?: number;
    onChangePage?: any;
    page?: number;
}) {
    const classes = useStyles();

    // function handleChangeRowsPerPage(per_page) {
    //     if (onChangeRowsPerPage) {
    //         onChangeRowsPerPage()
    //     }
    // }

    let tableElements: {
        headers: any[],
        rows: any[]
    } = {
        headers: [],
        rows: []
    }

    tableElements.headers = columns.map((columnConfig) => {
        return (<TableCell key={columnConfig.key}>{columnConfig.header}</TableCell>)
    })

    tableElements.rows = data.map((row, index) => {
        let target = index === 0 ? tableElements.headers : tableElements.rows
        return (<TableRow key={row.id}>
            {columns.map((columnConfig) => {
                let colData = row[columnConfig.key]

                if (columnConfig.renderFn) {
                    return (<TableCell key={columnConfig.key}>{columnConfig.renderFn(row)}</TableCell>)
                }

                // moment format if start or end time
                if (columnConfig.key === 'start' || columnConfig.key === 'end') {
                    let mome = moment(colData)
                    return (<TableCell key={columnConfig.key}>{mome.format("dddd, MMMM Do YYYY, h:mm:ss a")}</TableCell>)
                }
                return (<TableCell key={columnConfig.key}>{colData}</TableCell>)
            })}
        </TableRow>)
    })

    let noResults = null
    if (data.length === 0) {
        noResults = (
            <Box m={4} className={classes.noResults}>
                <Typography variant={"caption"}>No Results</Typography>
            </Box>
        )
    }

    let itemCount = data.length

    let paginationProps = {}

    // if we have a count prop
    if (count !== undefined) {
        itemCount = count
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {tableElements.headers}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableElements.rows}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            {/* enable pagination with api result set */}
                            {rowsPerPage && (

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15, 25]}
                                    // colSpan={3}
                                    count={itemCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={onChangePage}
                                    onChangeRowsPerPage={onChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActions}
                                />
                            )}
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>


            {noResults}

            {/* <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
        </Link>
            </div> */}
        </React.Fragment>
    );
}