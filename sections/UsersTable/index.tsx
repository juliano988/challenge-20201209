import React, { useEffect, useState } from 'react';
import styles from '../../styles/sections/UsersTable/index-styles.module.scss'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { PaginationMeta, TableItem, User } from '../../customTypes';
import UserModal from './components/UserModal';

export default function UsersTable() {

  const columns = [
    {
      name: 'Foto',
      selector: 'imageMin',
      sortable: true,
    },
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
      let tempObj = {
        image: <img src={user.picture.large}></img>,
        imageMin: <img src={user.picture.thumbnail}></img>,
        fullName: user.name.first + ' ' + user.name.last,
        title: user.name.title.replace('Miss', 'Srta.').replace('Mrs', 'Sra.').replace('Mr', 'Sr.').replace('Ms', 'Sra.'),
        email: user.email,
        gender: user.gender.replace('female', 'Feminino').replace('male', 'Masculino'),
        birthDate: new Date(user.dob.date).toLocaleDateString('pt-BR'),
        phone: user.phone,
        nationality: user.nat,
        address: user.location.street.name + ' nº' + user.location.street.number + ', ' + user.location.city + ' - ' + user.location.state,
        id: user.login.uuid,
        userData: user
      } as TableItem;
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
        <div className={styles.table_div}>
          <DataTable
            title="Tabela de clientes"
            onRowClicked={(row, e) => handleRowClick(row, e)}
            pointerOnHover={true}
            striped={true}
            highlightOnHover={true}
            responsive={true}
            dense={true}
            columns={columns}
            data={tableContent}
          />
        </div>
        {actualTableMeta.page !== actualTableMeta.pages &&
          <Button variant="info" disabled={fetchLoading ? true : false} onClick={handleClickButton}>Carregar mais</Button>}
        <UserModal modalUserData={modalUserData} setmodalUserData={setmodalUserData} tableContent={tableContent} settableContent={settableContent} showUserModal={showUserModal} setShowUserModal={setShowUserModal} />
      </section>
    )
  }

}