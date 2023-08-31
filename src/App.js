import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Edit,
  Delete,
  Group,
  VerifiedUser,
  PendingActions,
} from "@mui/icons-material";
import Widget from "./components/Widget";
import Sidebar from "./components/Sidebar";
import styled from "@emotion/styled";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import axios from "axios";
import EditUser from "./components/EditUser";

const Home = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("")
  const [editUser, setEditUser] = useState(null);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F3F4F6",
      color: "#121828",
      fontWeight: 600,
      fontSize: 15,
      padding: "10px 18px",
    },

    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      padding: "10px 18px",
    },
  }));

  useEffect(() => {
    getUsers();
  },[page, searchText])

  const getUsers = async () => {
    try {
        let payload = {
          "page": parseInt(page),
          "limit": parseInt(limit)
        }
        // if(searchText){
        //   payload.searchTerm = searchText
        // }
        let response = await axios.post('http://localhost:8000/users', payload);
        if(response.data){
          setUsers(response.data.users)
          setCount(response.data.totalUsers)
        }
    } catch (error) {
        console.log(error.response)
    }
  }

  const deleteUser = async (id) => {
    try {
        let response = await axios.delete(`http://localhost:8000/users/${id}`);
        console.log(response);
        getUsers()
    } catch (error) {
        console.log(error.response)
    }
  }

  return (
    <div className=" bg-[#E5E5E5] flex">
      <div>
        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className=" w-full px-8 py-8 xs:mx-1  grid grid-cols-4  md:grid-cols-3 xs:grid-cols-2 gap-28">
          <div className=" whitespace-nowrap  w-full ">
            <Widget
              id="1"
              title="Total Users"
              icon={<Group fontSize="12" />}
              number={count}
              subtitle="Total Users"
              handleClick={() => {setOpenModal(true); setModalContent(`Total Users: ${count}`)}}
            />
          </div>
          <div className="whitespace-nowrap w-full ">
            <Widget
              id="2"
              title="Verified Users"
              icon={<VerifiedUser fontSize="12" />}
              number={10}
              subtitle="Total Verified Users"
              handleClick={() => {setOpenModal(true); setModalContent(`Total Verified Users: 10`)}}
            />
          </div>
          <div className=" w-full">
            <Widget
              id="3"
              title="Verification Pending Users"
              icon={<PendingActions fontSize="12" />}
              number={4}
              subtitle="Total Verification Pending Users"
              handleClick={() => {setOpenModal(true); setModalContent(`Total Verification Pending Users: 4`)}}
            />
          </div>
        </div>
        <div className="w-full px-8">
        <div className="bg-[white] z-[2] rounded">
          <div className="flex flex-row my-1 justify-end py-3 items-center xs:flex-col px-2.5  bg-[white] rounded-t">
            <SearchBar
              searchText={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              clear={() => setSearchText("")}
            />
            <div className="flex justify-center items-center text-[#65748B] ml-1 xs:w-full  xs:mx-auto xs:mb-4">
              <Pagination
                limit={limit}
                page={page}
                count={count}
                onClick={(val) => setPage(val)}
                length={users.length}
              />
            </div>
          </div>
          <TableContainer sx={{borderRadius:"4px"}}>
            {users.length > 0 ? <Table>
              <TableHead>
                {["SL NO", "NAME","EMAIL","MOBILE","ACTIONS"].map(h => (
                  <StyledTableCell>
                    {h}
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {users.map((d,index) => {
                  return <TableRow key={d.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{d.name}</StyledTableCell>
                    <StyledTableCell>{d.email}</StyledTableCell>
                    <StyledTableCell>{d.mobile}</StyledTableCell>
                    <StyledTableCell>
                      <Edit 
                        fontSize="small" 
                        sx={{color: "gray", marginRight:"8px"}} 
                        onClick={() => setEditUser(d)}
                      /> 
                      <Delete fontSize="small" sx={{color: "red"}} onClick={() => deleteUser(d.id)} />
                    </StyledTableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table> : <div className="h-full my-40 flex justify-center w-full">No users found!!!</div>}
          </TableContainer>
        </div>
        </div>
      </div>

      <EditUser editUser={editUser} onClose={() => setEditUser(null)} getUsers={getUsers} />
      <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={modalContent}
       />
    </div>
  );
};

export default Home;