import React, { useState } from "react";
import styles from '../../../styles/sections/UsersTable/TableFilter-styles.module.scss';
import { Alert, Button, Form, FormControl, InputGroup, Spinner, Toast } from "react-bootstrap";
import { PaginationMeta, User } from "../../../customTypes";


export default function TableFilter(props: { setfreezedNameFilterField: React.Dispatch<React.SetStateAction<string>>, setfiltredData: React.Dispatch<React.SetStateAction<User[]>>, setfiltredDataMeta: React.Dispatch<React.SetStateAction<PaginationMeta>> }) {

  const [nameFilterField, setnameFilterField] = useState<string>('');
  const [searchLoading, setsearchLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);

  function handleClickSearchBtn() {
    setsearchLoading(true);
    fetch('/api/users/filter?userName=' + nameFilterField + '&p=1')
      .then(function (res) {
        return res.json();
      }).then(function (data: { meta: PaginationMeta, users: Array<User> }) {
        props.setfiltredData(data.users);
        props.setfiltredDataMeta(data.meta);
        props.setfreezedNameFilterField(nameFilterField);
        setsearchLoading(false);
      }).catch(function (err) {
        setShowToast(true);
        setsearchLoading(false);
      })
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Filtro</InputGroup.Text>
        <InputGroup.Text>Nome</InputGroup.Text>
        <FormControl type="text" value={nameFilterField} onChange={(e) => setnameFilterField(e.target.value)} placeholder="Ex.: John Doe" />
        <Button onClick={handleClickSearchBtn} disabled={searchLoading ? true : false} variant="outline-secondary">
          {searchLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Buscar'}
        </Button>
        <Button onClick={() => { setnameFilterField(''); props.setfreezedNameFilterField('') }} variant="outline-secondary">X</Button>
      </InputGroup>

      <Toast className={styles.search_toast} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>Nenhum resultado de busca encontrado.</Toast.Body>
      </Toast>
    </div>
  )
}