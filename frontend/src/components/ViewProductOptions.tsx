import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { getProductOptionAction } from './../store/features/productOption'
import Link from '@material-ui/core/Link';
import Table from '../components/Table';
import Container from '@material-ui/core/Container'
import { useParams, Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(3)
    }
}))

function ViewProductOptions({ getProductOptions, productOptions }: any) {
    let classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [queryParams, setQueryParams] = useState<any>({
        per_page: rowsPerPage,
        page: 1
    });

    useEffect(() => {
        getProductOptions({ queryParams })
    }, [queryParams])

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRowsPerPage(parseInt(event.target.value))
        setQueryParams({
            ...queryParams,
            page: 1,
            per_page: parseInt(event.target.value)
        })
        setPage(0)
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        // 0 based page index
        setPage(newPage);
        setQueryParams({
            ...queryParams,
            page: newPage + 1
        })
    };

    let columns: any[] = [
        {
            key: 'id',
            header: 'Id',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/productOption/edit/${rowData.id}`}>{rowData.id}</Link>
                )
            }
        },
        {
            key: 'name',
            header: 'Name',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/productOption/edit/${rowData.id}`}>{rowData.name}</Link>
                )
            }
        }
    ]

    let tableRender
    if (productOptions) {
        tableRender = <Table columns={columns} data={productOptions.data} count={productOptions.total} rowsPerPage={rowsPerPage} onChangeRowsPerPage={handleRowsPerPageChange} onChangePage={handleChangePage} page={page} />
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Typography component="h1" variant="h3" className={classes.title}>View Product Options</Typography>
            {tableRender}
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        productOptions: state.productOption.productOptions
    }
}

const mapDispatch = {
    getProductOptions: getProductOptionAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ViewProductOptions)