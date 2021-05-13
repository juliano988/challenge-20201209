import React, { useState } from "react";
import styles from '../../../styles/sections/UsersTable/TableFilter-styles.module.scss';
import { Alert, Button, Form, FormControl, InputGroup, Spinner, Toast } from "react-bootstrap";
import { PaginationMeta, User } from "../../../customTypes";


export default function TableFilter(props: { setfreezedNameFilterField: React.Dispatch<React.SetStateAction<string>>, setfreezedLastNameFilterField: React.Dispatch<React.SetStateAction<string>>, setfreezedGenderFilterField: React.Dispatch<React.SetStateAction<string>>, setfiltredData: React.Dispatch<React.SetStateAction<User[]>>, setfiltredDataMeta: React.Dispatch<React.SetStateAction<PaginationMeta>> }) {

  const [nameFilterField, setnameFilterField] = useState<string>('');
  const [lastNameFilterField, setlastNameFilterField] = useState<string>('');
  const [genderFilterField, setgenderFilterField] = useState<string>('');
  const [searchLoading, setsearchLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState(false);

  function handleClickSearchBtn(clear: boolean) {
    setsearchLoading(true);
    fetch('/api/users/filter?userName=' + encodeURI(clear ? '' : nameFilterField) +
      '&userLastName=' + encodeURI(clear ? '' : lastNameFilterField) +
      '&userGender=' + (clear ? '' : genderFilterField) + '&p=1')
      .then(function (res) {
        return res.json();
      }).then(function (data: { meta: PaginationMeta, users: Array<User> }) {
        props.setfiltredData(data.users);
        props.setfiltredDataMeta(data.meta);
        props.setfreezedNameFilterField(clear ? '' : nameFilterField);
        props.setfreezedLastNameFilterField(clear ? '' : lastNameFilterField);
        props.setfreezedGenderFilterField(clear ? '' : genderFilterField);
        setsearchLoading(false);
      }).catch(function (err) {
        setShowToast(true);
        setsearchLoading(false);
      })
  }

  function handleClearBtn() {
    setnameFilterField('');
    props.setfreezedNameFilterField('');
    setgenderFilterField('');
    props.setfreezedGenderFilterField('');
    setlastNameFilterField('');
    props.setfreezedLastNameFilterField('');
    handleClickSearchBtn(true);
  }

  return (
    <div onKeyPress={(e) => e.key === 'Enter' && handleClickSearchBtn(false)}>
      <InputGroup size="sm" className="mb-1">
        <InputGroup.Text>Nome</InputGroup.Text>
        <FormControl type="text" value={nameFilterField} onChange={(e) => setnameFilterField(e.target.value)} placeholder="Ex.: John" />
        <FormControl type="text" value={lastNameFilterField} onChange={(e) => setlastNameFilterField(e.target.value)} placeholder="Ex.: Doe" />
      </InputGroup>

      <InputGroup size="sm">
        <InputGroup.Text>Gênero</InputGroup.Text>
        <Form.Control size="sm" as="select" value={genderFilterField} onChange={(e) => setgenderFilterField(e.target.value)} >
          <option value="" >Selecionar</option>
          <option value="male" >Masculino</option>
          <option value="female" >Feminino</option>
        </Form.Control>

        <Button onClick={() => handleClickSearchBtn(false)} disabled={searchLoading ? true : false} variant="outline-secondary">
          {searchLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Buscar'}
        </Button>
        <Button onClick={handleClearBtn} variant="outline-secondary">X</Button>
      </InputGroup>

      <Toast className={styles.search_toast} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>Nenhum resultado de busca encontrado.</Toast.Body>
      </Toast>
    </div>
  )
}