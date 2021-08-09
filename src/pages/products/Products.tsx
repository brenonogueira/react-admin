import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Product } from '../../models/product'
import Layout from '../../components/Layout'
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { ToggleButtonGroup } from '@material-ui/lab'


export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(0)
    const perPage = 10;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const del = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`api/admin/products/${id}`)
        }

        setProducts(products.filter(p => p.id !== id));
    }

    useEffect(() => {
        (
            async () => {
                const { data } = await api.get('api/admin/products');
                setProducts(data);
            }
        )()
    }, [])

    return (
        <Layout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'/products/create'} variant="contained" color="primary"> ADD</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * perPage, (page + 1) * perPage).map(product => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell><img src={product.image} width={50} /></TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <ToggleButtonGroup>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`/products/${product.id}/edit`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => del(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </ToggleButtonGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        // component="div"
                        count={products.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={perPage}
                        rowsPerPageOptions={[]}
                    />
                </TableFooter>
            </Table>
        </Layout>
    )
}
