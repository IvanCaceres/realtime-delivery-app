import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { getAdminOrdersAction } from './../store/features/order'
import Link from '@material-ui/core/Link';
import Table from '../components/Table';
import Container from '@material-ui/core/Container'
import { useParams, Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(3)
    }
}))

function ViewOrders({ getOrders, orders }: any) {
    let classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [queryParams, setQueryParams] = useState<any>({
        per_page: rowsPerPage,
        page: 1
    });

    useEffect(() => {
        getOrders({ queryParams })
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
            header: 'Order Id',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/order/edit/${rowData.id}`}>{rowData.id}</Link>
                )
            }
        },
        {
            key: 'order_status',
            header: 'Status',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/order/edit/${rowData.id}`}>{rowData.order_status}</Link>
                )
            }
        },
        {
            key: 'username',
            header: 'Username',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/order/edit/${rowData.id}`}>{rowData.user.username}</Link>
                )
            }
        },
        {
            key: 'placed',
            header: 'Placed',
            renderFn: (rowData: any) => {
                return (
                    <Link component={RouterLink} to={`/admin/order/edit/${rowData.id}`}>{moment(rowData.placed).format('MM-DD-YYYY h:mm a')}</Link>
                )
            }
        }
    ]

    let tableRender
    if (orders) {
        tableRender = <Table columns={columns} data={orders} />
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Typography component="h1" variant="h3" className={classes.title}>View Orders</Typography>
            {tableRender}
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        orders: state.order.orders
    }
}

const mapDispatch = {
    getOrders: getAdminOrdersAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ViewOrders)