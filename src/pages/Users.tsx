import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { User } from '../models/user'
import api from '../services/api'


export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(0);
  const perPage = 10;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    (
      async () => {
        const response = await api.get('api/admin/ambassadors');
        setUsers(response.data)
      }
    )()
  }, [])

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * perPage, (page + 1) * perPage).map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" href={`users/${user.id}/links`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
              <TablePagination
              component="div"
              count={users.length}
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
