import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { getProductOptionAction } from './../store/features/productOption'
import Link from '@material-ui/core/Link';
import Table from '../components/Table';
import Container from '@material-ui/core/Container'
import { useParams, Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import { getReferralCodeAction } from "../store/features/referralCode";
const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(3)
    }
}))

function ViewReferralCodes({ getReferralCodes, referralCodes }: any) {
    let classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [queryParams, setQueryParams] = useState<any>({
        per_page: rowsPerPage,
        page: 1
    });

    useEffect(() => {
        getReferralCodes({ queryParams })
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
            // renderFn: (rowData: any) => {
            //     return (
            //         <Link component={RouterLink} to={`/admin/productOption/edit/${rowData.id}`}>{rowData.id}</Link>
            //     )
            // }
        },
        {
            key: 'code',
            header: 'Code',
            // renderFn: (rowData: any) => {
            //     return (
            //         <Link component={RouterLink} to={`/admin/referralCode/edit/${rowData.id}`}>{rowData.name}</Link>
            //     )
            // }
        },
        {
            key: 'user',
            header: 'User',
            renderFn: (rowData: any) => {
                return (
                    rowData.user ? rowData.user.username : 'None'
                )
            }
        }
    ]

    let tableRender
    if (referralCodes) {
        tableRender = <Table columns={columns} data={referralCodes.data} count={referralCodes.total} rowsPerPage={rowsPerPage} onChangeRowsPerPage={handleRowsPerPageChange} onChangePage={handleChangePage} page={page} />
    }

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Typography component="h1" variant="h3" className={classes.title}>View Referral Codes</Typography>
            {tableRender}
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        referralCodes: state.referralCode.referralCodes
    }
}

const mapDispatch = {
    getReferralCodes: getReferralCodeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ViewReferralCodes)