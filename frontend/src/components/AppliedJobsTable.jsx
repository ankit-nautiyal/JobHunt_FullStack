import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>List of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2].map((item, index) =>(
                            <TableRow key={index}>
                                <TableCell>02-08-2025</TableCell>
                                <TableCell>SDE-I</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell > <Badge >Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobsTable