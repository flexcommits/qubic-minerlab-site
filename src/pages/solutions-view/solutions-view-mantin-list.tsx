// import React, { useCallback } from "react";
// import { GetManyResponse, useDeleteMany, useGetIdentity, useMany } from "@refinedev/core";
// import { useTable } from "@refinedev/react-table";
// import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
// import {
//     useForm,
//     SaveButton,
//     useSelect,
//     DeleteButton,
//     List,
//     DateField,
//     EditButton,
// } from "@refinedev/mantine";

// import {
//     Button,
//     Table,
//     Group,
//     Select,
//     TextInput,
//     ActionIcon,
//     Checkbox,
//     ScrollArea,
//     Pagination,
//     Space,
//     Box,
// } from "@mantine/core";

// import MDEditor from "@uiw/react-md-editor";
// import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

// import { ColumnFilter, ColumnSorter } from "../../components/table";
// import { IPost, ICategory, ISolutionsView } from "../../interfaces";

// export const SolutionViewMantinList: React.FC = () => {
//     // const {
//     //     refineCore: { id, setId },
//     //     getInputProps,
//     //     saveButtonProps,
//     // } = useForm<IPost>({
//     //     refineCoreProps: {
//     //         redirect: false,
//     //         action: "edit",
//     //     },
//     //     initialValues: {
//     //         title: "",
//     //         category: {
//     //             id: "",
//     //         },
//     //         content: "",
//     //     },
//     // });
//     const { data: identity }: any = useGetIdentity();
//     const solutionViewForm = useForm<ISolutionsView>({
//         refineCoreProps: {
//             redirect: false,
//             action: "edit",
//         },
//         initialValues: {
//             version: "",
//             miner: "",
//             solution: 0,
//             lastActive: "",
//             its: 0,
//             identity: "",
//             isActive: false,
//         },
//     })

  
//     const { selectProps: soultionViewFilterProps } = useSelect<ISolutionsView>({
//       resource: 'solutions_view',
//       filters: [
//         {
//           field: "miner",
//           operator: "contains",
//           value: identity?.minerId,
//         },
//       ]
//     });

//     const columns = React.useMemo<ColumnDef<ISolutionsView>[]>(
//         () => [
//             {
//                 id: "selection",
//                 accessorKey: "id",
//                 enableSorting: false,
//                 enableColumnFilter: false,
//                 // header: function render({ table }) {
//                 //     return (
//                 //         <Group noWrap>
//                 //             <Checkbox
//                 //                 checked={table.getIsAllRowsSelected()}
//                 //                 indeterminate={table.getIsSomeRowsSelected()}
//                 //                 onChange={table.getToggleAllRowsSelectedHandler()}
//                 //             />                            
//                 //         </Group>
//                 //     );
//                 // },
//                 cell: function render({ row }) {
//                     return (
//                         <Group noWrap>
//                             <Checkbox
//                                 checked={row.getIsSelected()}
//                                 indeterminate={row.getIsSomeSelected()}
//                                 onChange={row.getToggleSelectedHandler()}
//                             />
//                             <ActionIcon
//                                 size="xs"
//                                 onClick={() => row.toggleExpanded()}
//                             >
//                                 {row.getIsExpanded() ? (
//                                     <IconChevronDown />
//                                 ) : (
//                                     <IconChevronRight />
//                                 )}
//                             </ActionIcon>
//                         </Group>
//                     );
//                 },
//             },
//             {
//                 id: "id",
//                 header: "ID",
//                 accessorKey: "id",
//             },
//             // {
//             //     id: "title",
//             //     header: "Title",
//             //     accessorKey: "title",
//             //     meta: {
//             //         filterOperator: "contains",
//             //     },
//             // },
//             // {
//             //     id: "category.id",
//             //     header: "Category",
//             //     enableColumnFilter: false,
//             //     accessorKey: "category.id",
//             //     cell: function render({ getValue, table }) {
//             //         const meta = table.options.meta as {
//             //             categoriesData: GetManyResponse<ICategory>;
//             //         };
//             //         const category = meta.categoriesData?.data.find(
//             //             (item) => item.id === getValue(),
//             //         );
//             //         return category?.title ?? "Loading...";
//             //     },
//             // },
//             // {
//             //     id: "createdAt",
//             //     header: "Created At",
//             //     accessorKey: "createdAt",
//             //     cell: function render({ getValue }) {
//             //         return (
//             //             <DateField value={getValue() as string} format="LLL" />
//             //         );
//             //     },
//             //     enableColumnFilter: false,
//             // },
//             // {
//             //     id: "actions",
//             //     header: "Actions",
//             //     accessorKey: "id",
//             //     enableColumnFilter: false,
//             //     enableSorting: false,
//             //     cell: function render({ getValue }) {
//             //         return (
//             //             <Group spacing="xs" noWrap>
//             //                 <EditButton
//             //                     hideText
//             //                     onClick={() => {
//             //                         // setId(getValue() as number);
//             //                     }}
//             //                 />
//             //                 <DeleteButton
//             //                     hideText
//             //                     recordItemId={getValue() as number}
//             //                 />
//             //             </Group>
//             //         );
//             //     },
//             // },
//         ],
//         [soultionViewFilterProps.data],
//     );

//     const {
//         setOptions,
//         getAllColumns,
//         getHeaderGroups,
//         getRowModel,
//         resetRowSelection,
//         refineCore: {
//             tableQueryResult: { data: tableData },
//             setCurrent,
//             pageCount,
//             current,
//         },
//     } = useTable<ISolutionsView>({
//         columns,
//         // getRowId: (originalRow) => originalRow.id.toString(),
//     });

//     // const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];

//     // console.log("tableData --- >>> ", tableData)

//     const miners = tableData?.data?.map((item) => item.miner) ?? [];

//     const { selectProps } = useSelect<ISolutionsView>({
//         resource: "solutions_view",
//         defaultValue: miners,
//     });

//     // const { selectProps } = useSelect<ICategory>({
//     //     resource: "categories",
//     //     defaultValue: categoryIds,
//     // });

//     // setOptions((prev) => ({
//     //     ...prev,
//     //     meta: {
//     //         ...prev.meta,
//     //         categoriesData,
//     //     },
//     // }));

//     const renderEditRow = useCallback(
//         (row: Row<ISolutionsView>) => {
//             const { id } = row.original;

//             return (
//                 <React.Fragment key={id}>
//                     <tr>
//                         <td>
//                             <ActionIcon onClick={() => row.toggleExpanded()}>
//                                 {row.getIsExpanded() ? (
//                                     <IconChevronDown />
//                                 ) : (
//                                     <IconChevronRight />
//                                 )}
//                             </ActionIcon>
//                         </td>
//                         <td>{id}</td>
//                         <td>
//                             {/* <TextInput
//                                 id="title-input"
//                                 {...getInputProps("title")}
//                             /> */}
//                         </td>
//                         <td>
//                             {/* <Select
//                                 id="category-select"
//                                 {...getInputProps("category.id")}
//                                 {...selectProps}
//                             /> */}
//                         </td>
//                         <td>
//                             {/* <Group spacing={4} noWrap>
//                                 <SaveButton size="xs" {...saveButtonProps} />
//                                 <Button
//                                     size="xs"
//                                     variant="default"
//                                     onClick={() => setId(undefined)}
//                                 >
//                                     Cancel
//                                 </Button>
//                             </Group> */}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan={getAllColumns().length}>
//                             {/* <MDEditor
//                                 data-color-mode="light"
//                                 {...getInputProps("content")}
//                             /> */}
//                         </td>
//                     </tr>
//                 </React.Fragment>
//             );
//         },
//         [selectProps],
//     );

//     return (
//         <ScrollArea>
//             <List>
//                 <Table>
//                     <thead>
//                         {getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => (
//                                     <th key={header.id}>
//                                         {!header.isPlaceholder && (
//                                             <Group spacing="xs" noWrap>
//                                                 <Box>
//                                                     {flexRender(
//                                                         header.column.columnDef
//                                                             .header,
//                                                         header.getContext(),
//                                                     )}
//                                                 </Box>
//                                                 <Group spacing="xs" noWrap>
//                                                     <ColumnSorter
//                                                         column={header.column}
//                                                     />
//                                                     <ColumnFilter
//                                                         column={header.column}
//                                                     />
//                                                 </Group>
//                                             </Group>
//                                         )}
//                                     </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody>
//                         {getRowModel().rows.map((row) => {
//                             if (solutionViewForm.refineCore.id === (row.original as ISolutionsView).id) {
//                                 return renderEditRow(row);
//                             } else
//                                 return (
//                                     <React.Fragment key={row.id}>
//                                         <tr key={row.id}>
//                                             {row
//                                                 .getVisibleCells()
//                                                 .map((cell) => {
//                                                     return (
//                                                         <td key={cell.id}>
//                                                             {flexRender(
//                                                                 cell.column
//                                                                     .columnDef
//                                                                     .cell,
//                                                                 cell.getContext(),
//                                                             )}
//                                                         </td>
//                                                     );
//                                                 })}
//                                         </tr>

//                                         {row.getIsExpanded() && (
//                                             <tr id="expanded-row">
//                                                 <td
//                                                     colSpan={
//                                                         row.getVisibleCells()
//                                                             .length
//                                                     }
//                                                 >
//                                                     <MDEditor
//                                                         data-color-mode="dark"
//                                                         contentEditable={false}
//                                                         preview="preview"
//                                                         value={
//                                                             row.original.version
//                                                         }
//                                                     />
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </React.Fragment>
//                                 );
//                         })}
//                     </tbody>
//                 </Table>
//                 <Space h={16} />
//                 <Pagination
//                     position="right"
//                     total={pageCount}
//                     page={current}
//                     onChange={setCurrent}
//                 />
//             </List>
//         </ScrollArea>
//     );
// };

export {}