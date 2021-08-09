import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link } from '../models/link'
import api from '../services/api'


export default function Links(props: any) {
    console.log(props)
  const [links, setLinks] = useState<Link[]>([])
  const [page, setPage] = useState(0);
  const perPage = 10;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    (
      async () => {
        const response = await api.get(`api/admin/users/${props.match.params.id}/links`);
        setLinks(response.data)
      }
    )()
  }, [])

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page * perPage, (page + 1) * perPage).map(link => {
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
              <TablePagination
              component="div"
              count={links.length}
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
