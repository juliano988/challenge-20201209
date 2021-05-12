import React, { useEffect, useState } from 'react';
import styles from '../../styles/sections/UsersTable/index-styles.module.scss'
import { Button, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { PaginationMeta, TableItem, User } from '../../customTypes';
import UserModal from './components/UserModal';
import TableFilter from './components/TableFilter';

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

  const [freezedNameFilterField, setfreezedNameFilterField] = useState<string>('');
  const [filtredData, setfiltredData] = useState<Array<User>>([]);
  const [filtredDataMeta, setfiltredDataMeta] = useState<PaginationMeta>();

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
        birthDate: new Date(new Date(user.dob.date).getTime() + 10800000).toLocaleDateString('pt-BR'),
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

  useEffect(function () {
    if (filtredData && filtredDataMeta) {
      setactualTableUsers(filtredData);
      setactualTableMeta(filtredDataMeta);
      buildTableContent(filtredData);
    }
  }, [filtredData, filtredDataMeta])

  function handleRowClick(row: TableItem, e: MouseEvent) {
    setmodalUserData(row);
    setShowUserModal(true);
  }

  function handleClickButton() {
    if (actualTableMeta.page + 1 <= actualTableMeta.pages) {
      setfetchLoading(true);
      const regularURI = '/api/users?p=' + (actualTableMeta.page + 1);
      const searchURI = '/api/users/filter?userName=' + encodeURI(freezedNameFilterField) + '&p=' + (actualTableMeta.page + 1);
      fetch(filtredData.length ? searchURI : regularURI).then(function (res) {
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
        <TableFilter setfreezedNameFilterField={setfreezedNameFilterField} setfiltredData={setfiltredData} setfiltredDataMeta={setfiltredDataMeta} />
        <div className={styles.table_div}>
          <DataTable
            title="Tabela de clientes"
            onRowClicked={(row, e) => handleRowClick(row, e)}
            pointerOnHover={true}
            striped={true}
            highlightOnHover={true}
            responsive={true}
            dense={true}
            defaultSortField="fullName"
            columns={columns}
            data={tableContent}
          />
        </div>
        {actualTableMeta.page !== actualTableMeta.pages &&
          <Button variant="info" disabled={fetchLoading ? true : false} onClick={handleClickButton}>
            {fetchLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Carregar mais'}
            </Button>}
        <UserModal modalUserData={modalUserData} setmodalUserData={setmodalUserData} tableContent={tableContent} settableContent={settableContent} showUserModal={showUserModal} setShowUserModal={setShowUserModal} />
      </section>
    )
  }

}