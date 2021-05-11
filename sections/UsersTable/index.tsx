import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { PaginationMeta, TableItem, User } from '../../customTypes';

export default function UsersTable() {

  const columns = [
    {
      name: 'Foto',
      selector: 'image',
      sortable: true,
    },
    {
      name: 'Nome completo',
      selector: 'fullName',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
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
    {
      name: 'Telefone',
      selector: 'phone',
      sortable: true,
    },
    {
      name: 'Nacionalidade',
      selector: 'nationality',
      sortable: true,
    },
    {
      name: 'Endereço',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
  ];

  const [tableContent, settableContent] = useState([]);
  const [actualTableUsers, setactualTableUsers] = useState<Array<User>>();
  const [actualTableMeta, setactualTableMeta] = useState<PaginationMeta>();
  const [mountLoading, setmountLoading] = useState<boolean>(true);
  const [fetchLoading, setfetchLoading] = useState(false)

  function buildTableContent(users: Array<User>) {
    const tempArr = [];
    users.forEach(function (user) {
      let tempObj = {} as TableItem;
      tempObj.image = <img src={user.picture.thumbnail}></img>;
      tempObj.fullName = user.name.first + ' ' + user.name.last;
      tempObj.email = user.email;
      tempObj.gender = user.gender;
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
          columns={columns}
          data={tableContent}
        />
        <Button variant="info" disabled={fetchLoading ? true : false} onClick={handleClickButton}>Carregar mais</Button>
      </section>
    )
  }

}