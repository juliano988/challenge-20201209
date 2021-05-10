import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { TableItem, User } from '../../customTypes';

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
  const [loading, setloading] = useState<boolean>(true);
  const [tablePage, settablePage] = useState<number>(1);

  useEffect(function () {
    fetch('/api/users').then(function (res) {
      return res.json()
    }).then(function (users: Array<User>) {

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
        tableContent.push(tempObj)
      })
      settableContent(tableContent);
      setloading(false);
    })

  }, []);

  if (loading) {
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
          data={tableContent.slice(0, 50 * tablePage)}
        />
      </section>
    )
  }

}