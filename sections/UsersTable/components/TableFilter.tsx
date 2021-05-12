import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { PaginationMeta, User } from "../../../customTypes";


export default function TableFilter(props: { setfiltredData: React.Dispatch<React.SetStateAction<User[]>>, setfiltredDataMeta: React.Dispatch<React.SetStateAction<PaginationMeta>> }) {

  const [nameFilterField, setnameFilterField] = useState<string>('');

  function handleClickSearchBtn() {
    fetch('/api/users/filter?userName=' + nameFilterField + '&p=1')
      .then(function (res) {
        return res.json();
      }).then(function (data: { meta: PaginationMeta, foundedUsers: Array<User> }) {
        props.setfiltredData(data.foundedUsers);
        props.setfiltredDataMeta(data.meta);
      })
  }


  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Text>Filtro</InputGroup.Text>
        <InputGroup.Text>Nome</InputGroup.Text>
        <FormControl type="text" value={nameFilterField} onChange={(e) => setnameFilterField(e.target.value)} placeholder="Ex.: John Doe" />
        <Button onClick={handleClickSearchBtn} variant="outline-secondary">Buscar</Button>
        <Button variant="outline-secondary">X</Button>
      </InputGroup>
    </Form>
  )
}