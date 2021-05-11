import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { PaginationMeta, TableItem, User } from '../../customTypes';
import UserModal from './components/UserModal';

export default function UsersTable() {

  const columns = [
    {
      name: 'Nome completo',
      selector: 'fullName',
      sortable: true,
    },
    {
      name: 'Gênero',
      selector: 'gender',
      sortable: true,
    },
    {
      name: 'Data de nascimento',
      selector: 'birthDate',
      sortable: true,
    },
  ];

  const [tableContent, settableContent] = useState<Array<TableItem>>([]);
  const [actualTableUsers, setactualTableUsers] = useState<Array<User>>();
  const [actualTableMeta, setactualTableMeta] = useState<PaginationMeta>();
  const [mountLoading, setmountLoading] = useState<boolean>(true);
  const [fetchLoading, setfetchLoading] = useState<boolean>(false);

  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [modalUserData, setmodalUserData] = useState<TableItem>();

  function buildTableContent(users: Array<User>) {
    const tempArr = [];
    users.forEach(function (user) {
      let tempObj = {} as TableItem;
      tempObj.image = <img src={user.picture.large}></img>;
      tempObj.fullName = user.name.first + ' ' + user.name.last;
      tempObj.email = user.email;
      tempObj.gender = user.gender.replace(/female/,'Feminino').replace(/male/,'Masculino');
      tempObj.birthDate = new Date(user.dob.date).toLocaleDateString('pt-BR');
      tempObj.phone = user.phone;
      tempObj.nationality = user.nat;
      tempObj.address = user.location.street.name + ' nº' + user.location.street.number + ', ' + user.location.city + ' - ' + user.location.state;
      tempObj.id = user.login.uuid;
      tempArr.push(tempObj)
    })
    settableContent(tempArr);
  }

  useEffect(function () {
    fetch('/api/users?p=1').then(function (res) {
      return res.json()
    }).then(function (data: { meta: PaginationMeta, users: Array<User> }) {
      setactualTableUsers(data.users);
      setactualTableMeta(data.meta);
      buildTableContent(data.users);
      setmountLoading(false);
    })
  }, []);

  function handleRowClick(row: TableItem, e: MouseEvent) {
    setmodalUserData(row);
    setShowUserModal(true);
  }

  function handleClickButton() {
    if (actualTableMeta.page + 1 <= actualTableMeta.pages) {
      setfetchLoading(true);
      fetch('/api/users?p=' + (actualTableMeta.page + 1)).then(function (res) {
        return res.json()
      }).then(function (data: { meta: PaginationMeta, users: Array<User> }) {
        setactualTableUsers(actualTableUsers.concat(data.users));
        setactualTableMeta(data.meta);
        buildTableContent(actualTableUsers.concat(data.users));
        setfetchLoading(false);
      })
    }
  }

  if (mountLoading) {
    return (
      <section>
        <p>Carregando...</p>
      </section>
    )
  } else {
    return (
      <section>
        <DataTable
          title="Arnold Movies"
          onRowClicked={(row, e) => handleRowClick(row, e)}
          pointerOnHover={true}
          striped={true}
          highlightOnHover={true}
          responsive={true}
          dense={true}
          columns={columns}
          data={tableContent}
        />
        {actualTableMeta.page !== actualTableMeta.pages &&
          <Button variant="info" disabled={fetchLoading ? true : false} onClick={handleClickButton}>Carregar mais</Button>}
        <UserModal modalUserData={modalUserData} showUserModal={showUserModal} setShowUserModal={setShowUserModal}/>
      </section>
    )
  }

}