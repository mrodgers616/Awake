import { useSortBy, useTable, Column } from "react-table";
import { chakra, Table, Thead, Tbody, Tr, Th, Td, Box, Heading, Tfoot } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
  containerStyles?: Record<string, any>;
  titleStyles?: Record<string, any>;
  headerStyles?: Record<string, any>;
  bodyStyles?: Record<string, any>;
  tableStyles?: Record<string, any>;
  thStyles?: Record<string, any>;
  trStyles?: Record<string, any>;
  tdStyles?: Record<string, any>;
  sortBy: string;
  title?: string
};

export default function LeaderboardTable({
  data,
  columns,
  titleStyles,
  containerStyles,
  headerStyles,
  bodyStyles,
  tableStyles,
  thStyles,
  tdStyles,
  trStyles,
  sortBy,
  title
}: DataTableProps<any>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable(
    { 
      columns,
      data,
      initialState: { 
        sortBy: [
          {
            id: sortBy,
            desc: true
          }
        ]
      } 
    },
    useSortBy,
  )

  const sorted = (currentColumn: any) => {
    return currentColumn.isSorted ? sortedDesc(currentColumn) : null;
  }

  const sortedDesc = (currentColumn: any) => {
    return currentColumn.isSortedDesc ? (
      <TriangleDownIcon aria-label='sorted descending' />) : (
      <TriangleUpIcon aria-label='sorted ascending' />)
  }

  return (
    <Box {...containerStyles}>
      { title && <Heading as='h2' {...titleStyles}>{title}</Heading> }
    <Table 
      bg='white'
      borderRadius='16px'
      { ...getTableProps()}
      {...tableStyles}
    >
      <Thead {...headerStyles}>
        {headerGroups.map((headerGroup, index) => (
          <Tr { ...headerGroup.getHeaderGroupProps() } key={index} {...trStyles}>
            {headerGroup.headers.map((column) => (
              <Th 
                { ...column.getHeaderProps(column.getSortByToggleProps()) }
                key={`th-${column.id}`}
                { ...thStyles }
              >
                {column.render('Header')}
                <chakra.span>
                  { sorted(column) }
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody { ...getTableBodyProps() } {...bodyStyles}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr { ...row.getRowProps() } key={row.id} {...trStyles}>
              {row.cells.map((cell, i) => (
                <Td { ...cell.getCellProps()} key={`${i}-${(Math.random()*100).toFixed(0)}`} {...tdStyles}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        { footerGroups.map((footerGroup, index) => (
          <Tr { ...footerGroup.getFooterGroupProps() } key={index} {...trStyles}>
            {footerGroup.headers.map(column => (
              <Td { ...column.getFooterProps() } key={`${index}-${column.id}`} {...tdStyles}>{column.render('Footer')}</Td>
            ))}
          </Tr>
        ))}
      </Tfoot>
    </Table>
    </Box> 
  )
}